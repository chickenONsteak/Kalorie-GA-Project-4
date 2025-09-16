import psycopg2
from flask import request, jsonify, Blueprint
from db.db_pool import get_cursor, release_connection

intakes = Blueprint('intakes', __name__)

# # GET ALL INTAKES BY USER ID
# @intakes.route('/view_intakes', methods=['POST'])
# def get_all_intakes_by_user():
#     connection = None
#     try:
#