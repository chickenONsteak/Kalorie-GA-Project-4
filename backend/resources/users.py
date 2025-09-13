import psycopg2
from flask import request, jsonify, Blueprint
from db.db_pool import get_cursor, release_connection
from marshmallow import ValidationError
from validators.users import AddOneUserInputs, UpdateUserDetailsById

users = Blueprint('users', __name__)

# GET ALL USERS
@users.route('/users')
def find_all_users():
    connection = None # initialise first in case conn, cursor = get_cursor() fails and you get an error at the finally statement
    try:
        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM users;')
        results = cursor.fetchall()
        return jsonify(results), 200
    except psycopg2.Error as err:
        if connection: # there's a chance that connection = None
            connection.rollback() # clean the dirty connection if the SQL query fails
        print(f'database error: {err}')
        return jsonify(status='error'), 400
    except SyntaxError as err:
        if connection:
            connection.rollback()
        print(f'syntax error: {err}')
        return jsonify(status='error'), 400
    except Exception as err:
        if connection:
            connection.rollback()
        print(f'error: {err}')
        return jsonify(status='error'), 400
    finally:
        if connection:
            release_connection(connection)

# ADD ONE NEW USER
@users.route('/users', methods=['PUT'])
def add_new_user():
    connection = None
    try:
        # CHECK WHETHER REQUEST IS VALID FIRST BEFORE CONNECTING WITH THE DB
        data = request.get_json()
        try:
            AddOneUserInputs().load(data)
        except ValidationError as err:
            return jsonify(err.messages)
        # REQUEST IS VALID, CONNECT WITH DB
        connection, cursor = get_cursor()
        # CHECK IF EMAIL EXISTS
        cursor.execute('SELECT * FROM users WHERE email=%s', (data['email'],))
        if cursor.fetchone():
            print(f'email address taken')
            return jsonify(status='error', msg='email address taken'), 400
        else:
            cursor.execute('INSERT INTO users (email, first_name, last_name, password) VALUES (%s, %s, %s, %s);', (data['email'], data['first_name'], data['last_name'], data['password']))
            connection.commit()
            return jsonify(status='ok', msg='new user added'), 200
    except psycopg2.Error as err:
        if connection:
            connection.rollback()
        print(f'database error: {err}')
        return jsonify(status='error'), 400
    except SyntaxError as err:
        if connection:
            connection.rollback()
        print(f'syntax error: {err}')
        return jsonify(status='error'), 400
    except Exception as err:
        if connection:
            connection.rollback()
        print(f'error: {err}')
        return jsonify(status='error'), 400
    finally:
        if connection:
            release_connection(connection)

# UPDATE USER DETAILS BY ID
@users.route('/users/', methods=['PATCH'])
def update_user_details_by_id():
    connection = None
    try:
        uuid = request.json.get('uuid')
        email = request.json.get('email')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM users WHERE uuid=%s', (uuid,))
        results = cursor.fetchone()

        cursor.execute('UPDATE users '
                       'SET email=COALESCE(%s, %s), '
                       'first_name=COALESCE(%s, %s), '
                       'last_name=COALESCE(%s, %s) '
                       'WHERE uuid=%s',
                       (email, results['email'], first_name, results['first_name'], last_name, results['last_name'], uuid))
        connection.commit()
        return jsonify(status='ok', msg='updated user details'), 200
    except psycopg2.Error as err:
        if connection:
            connection.rollback()
        print(f'database error: {err}')
        return jsonify(status='error'), 400
    except SyntaxError as err:
        if connection:
            connection.rollback()
        print(f'syntax error: {err}')
        return jsonify(status='error'), 400
    except Exception as err:
        if connection:
            connection.rollback()
        print(f'error: {err}')
        return jsonify(status='error'), 400
    finally:
        if connection:
            release_connection(connection)