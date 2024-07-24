from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Reservation, Space
import datetime

reservations_bp = Blueprint('reservations_bp', __name__, url_prefix='/reservations')

@reservations_bp.route('/do', methods=['POST'])
@jwt_required()
def make_reservation():
    current_user_id = get_jwt_identity()

    data = request.get_json()
    space_id = data['space_id']
    start_time = datetime.datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M:%S')
    end_time = datetime.datetime.strptime(data['end_time'], '%Y-%m-%d %H:%M:%S')

    
    space = Space.query.get(space_id)
    if not space:
        return jsonify({'msg': 'Espacio no encontrado'}), 404
    
        
    overlapping_reservation = Reservation.query.filter(
        Reservation.space_id == space_id,
        Reservation.start_time < end_time,
        Reservation.end_time > start_time
    ).first()

    if overlapping_reservation:
        return jsonify({'message': 'El espacio ya está reservado en el intervalo solicitado'}), 400


    new_reservation = Reservation(user_id=current_user_id, space_id=space_id, start_time=start_time, end_time=end_time)

    try:
        db.session.add(new_reservation)
        db.session.commit()
        return jsonify({'success': 'Reserva creada exitosamente'})
    except ValueError as e:
        return jsonify({'msg': str(e)}), 400

@reservations_bp.route('/cancel/<int:reservation_id>', methods=['DELETE'])
@jwt_required()
def cancel_reservation(reservation_id):
    current_user_id = get_jwt_identity()

    reservation = Reservation.query.get(reservation_id)
    if not reservation:
        return jsonify({'msg': 'Reserva no encontrada'}), 404

    if reservation.user_id != current_user_id:
        return jsonify({'msg': 'No autorizado para cancelar esta reserva'}), 403

    db.session.delete(reservation)
    db.session.commit()
    return jsonify({'success': 'Reserva cancelada exitosamente'})
