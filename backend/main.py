import os
from flask import Flask, jsonify
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

@jwt.expired_token_loader
@jwt.invalid_token_loader
@jwt.unauthorized_loader
@jwt.needs_fresh_token_loader
@jwt.revoked_token_loader
def my_jwt_error_callback(*args):
    return jsonify(msg='access denied'), 200

app.register_blueprint(users, url_prefix='/api')
app.register_blueprint(calorie_goals, url_prefix='/goals')
app.register_blueprint(intakes, url_prefix='/intakes')
app.register_blueprint(openai_services, url_prefix='/openai')

if __name__ == '__main__':
    app.run(port=5002, debug=os.getenv('DEBUG', False))