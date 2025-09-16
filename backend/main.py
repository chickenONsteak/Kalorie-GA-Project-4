import os
from flask import Flask
from flask_cors import CORS
from resources.calorie_goals import calorie_goals
from resources.intakes import intakes
from resources.users import users
from flask_jwt_extended import JWTManager
from services.openai_services import openai_services

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(users, url_prefix='/api')
app.register_blueprint(calorie_goals, url_prefix='/goals')
app.register_blueprint(intakes, url_prefix='/intakes')
app.register_blueprint(openai_services, url_prefix='/openai')

if __name__ == '__main__':
    app.run(port=5002, debug=os.getenv('DEBUG', False))