from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Reservation, Space
from datetime import datetime, timedelta


reservations_queries_bp = Blueprint('reservations_queries_bp', __name__, url_prefix='/reservations_queries')

@reservations_queries_bp.route('/user_reservations', methods=['GET'])
@jwt_required()
def get_user_reservations():
    current_user_id = get_jwt_identity()

   
    reservations = Reservation.query.filter_by(user_id=current_user_id).all()

    if not reservations:
        return jsonify({'message': 'No se encontraron reservas para el usuario'}), 404

    
    reservations_list = [reservation.serialize() for reservation in reservations]

    return jsonify(reservations_list), 200

@reservations_queries_bp.route('/free_slots/<int:space_id>', methods=['GET'])
def get_free_slots(space_id):
    # Obtener el parámetro de la fecha desde la consulta
    date_str = request.args.get('date')
    if not date_str:
        return jsonify({'message': 'Se requiere la fecha en el parámetro "date"'}), 400
    
    try:
        requested_date = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        return jsonify({'message': 'Formato de fecha inválido. Use YYYY-MM-DD'}), 400
    
    # Obtener reservas para el espacio específico en el día solicitado
    start_of_day = requested_date.replace(hour=14, minute=0, second=0, microsecond=0)
    end_of_day = requested_date.replace(hour=20, minute=0, second=0, microsecond=0)

    reservations = Reservation.query.filter(
        Reservation.space_id == space_id,
        Reservation.start_time >= start_of_day,
        Reservation.end_time <= end_of_day
    ).order_by(Reservation.start_time).all()

    # Crear una lista para los intervalos libres
    free_slots = []
    current_start = start_of_day

    for reservation in reservations:
        if reservation.start_time > current_start:
            free_slots.append({
                'start_time': current_start.strftime('%Y-%m-%d %H:%M:%S'),
                'end_time': reservation.start_time.strftime('%Y-%m-%d %H:%M:%S')
            })
        current_start = max(current_start, reservation.end_time)

    if current_start < end_of_day:
        free_slots.append({
            'start_time': current_start.strftime('%Y-%m-%d %H:%M:%S'),
            'end_time': end_of_day.strftime('%Y-%m-%d %H:%M:%S')
        })

    return jsonify(free_slots), 200