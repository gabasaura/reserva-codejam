import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import db, User, Table, Schedule, Reservation
from auth import auth_bp

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/', methods=['GET'])
def main():
    return "Hola Mundo", 201

if __name__ == '__main__':
    app.run(port=3000)
