import os
from flask import Flask
from flask_cors import CORS
from resources.users import users

app = Flask(__name__)
CORS(app)

app.register_blueprint(users, url_prefix='/api')

if __name__ == '__main__':
    app.run(port=5002, debug=os.getenv('DEBUG', False))