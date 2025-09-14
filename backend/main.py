import os
from flask import Flask
from flask_cors import CORS
from resources.calorie_goals import calorie_goals
from resources.users import users
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.register_blueprint(users, url_prefix='/api')
app.register_blueprint(calorie_goals, url_prefix='/goals')

if __name__ == '__main__':
    app.run(port=5002, debug=os.getenv('DEBUG', False))