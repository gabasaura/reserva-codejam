from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  
    reservations = db.relationship('Reservation', backref='user')
    
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }
        
    def save(self):
        db.session.add(self)
        db.session.commit()

class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    reservations = db.relationship('Reservation', backref='space', lazy=True)

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, space_id, start_time, end_time):
        if end_time - start_time > timedelta(hours=4):
            raise ValueError("La duración máxima de la reserva es de 4 horas")
        if start_time < datetime.now():
            raise ValueError("No se pueden hacer reservas en el pasado")
        if start_time > datetime.now() + timedelta(days=30):
            raise ValueError("No se pueden hacer reservas con más de un mes de antelación")
        if start_time.hour < 14 or end_time.hour > 20:
            raise ValueError("Las reservas solo pueden ser entre la 2pm y las 8pm")
        if start_time.weekday() >= 5:  
            raise ValueError("Las reservas solo están permitidas de lunes a viernes")

        self.user_id = user_id
        self.space_id = space_id
        self.start_time = start_time
        self.end_time = end_time
        
    def serialize(self):
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'space_id': self.space_id,
            'start_time': self.start_time.strftime('%Y-%m-%d %H:%M:%S'),
            'end_time': self.end_time.strftime('%Y-%m-%d %H:%M:%S')
        }