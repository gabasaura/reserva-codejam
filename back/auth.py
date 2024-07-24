import datetime
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    password = request.json.get('password')
    email = request.json.get('email')

    if not email or email == "":
        return jsonify({"msg": "Email is required."}), 400
    if not password or password == "":
        return jsonify({"msg": "Password is required."}), 400

    user_found = User.query.filter_by(email=email).first()

    if not user_found or not check_password_hash(user_found.password, password):
        return jsonify({"msg": "Email or password is not correct."}), 401

    expires = datetime.timedelta(hours=72)
    access_token = create_access_token(identity=user_found.id, expires_delta=expires)
    datos = {
        "access_token": access_token,
        "user": user_found.serialize()
    }
    return jsonify(datos), 201

@auth_bp.route('/signup', methods=['POST'])
def sign_up():
    user_data = request.json
    if not user_data:
        return jsonify({"msg": "No JSON data received"}), 400

    password = user_data.get('password')
    email = user_data.get('email')
    name = user_data.get('name')
    

    if not password or password == "":
        return jsonify({"msg": "password is required"}), 400
    if not email or email == "":
        return jsonify({"msg": "email is required"}), 400
    if not name or name == "":
        return jsonify({"msg": "name is required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email is already in use"}), 400

    user = User(
        password=generate_password_hash(password),
        email=email,
        name=name
    )

    user.save()
    if user:
        expires = datetime.timedelta(hours=24)
        access_token = create_access_token(identity=user.id, expires_delta=expires)
        datos = {
            "access_token": access_token,
            "user": user.serialize()
        }
        return jsonify({"success": "Registration was Successful", "datos": datos}), 201
