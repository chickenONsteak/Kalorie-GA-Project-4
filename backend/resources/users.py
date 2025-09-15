import psycopg2
import bcrypt
from flask import request, jsonify, Blueprint
from db.db_pool import get_cursor, release_connection
from marshmallow import ValidationError
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from validators.users import AddOneUserInputs, UpdateUserDetailsById, SignInInputs

users = Blueprint('users', __name__)

# FUNCTION FOR GENERATING ACCESS AND REFRESH TOKENS UPON LOGGING IN
def generate_tokens(fetch_results):
    claims = {'first_name': fetch_results['first_name'], 'last_name': fetch_results['last_name'], 'user_id': fetch_results['uuid']}
    generated_access_token = create_access_token(fetch_results['email'], additional_claims=claims)
    generated_refresh_token = create_refresh_token(fetch_results['email'], additional_claims=claims)
    return generated_access_token, generated_refresh_token

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

# REGISTER NEW USER
@users.route('/register', methods=['PUT'])
def register():
    connection = None
    try:
        data = request.get_json()
        # CHECK WHETHER REQUEST IS VALID FIRST BEFORE CONNECTING WITH THE DB
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
            # cursor.execute('BEGIN')
            hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
            cursor.execute('INSERT INTO users (email, first_name, last_name, hashed_password) '
                           'VALUES (%s, %s, %s, %s) '
                           'RETURNING uuid;',
                           (data['email'], data['first_name'], data['last_name'], hashed_password.decode('utf-8'))
                           )
            user_id = cursor.fetchone()['uuid'] # TO GET THE UUID FROM THE RESULTS RETURNED BY fetchone() AFTER EXECUTING THE ABOVE

            # TO REGISTER ACCOUNT WITH CALORIE GOAL
            cursor.execute('INSERT INTO calorie_goals (user_id, calorie_goal, carbohydrates_goal, protein_goal, fats_goal) VALUES (%s, %s, %s, %s, %s);', (user_id , data['calorie_goal'], data['carbohydrates_goal'], data['protein_goal'], data['fats_goal']))
            connection.commit()

            # TO AUTO SIGN IN AFTER USER REGISTERS AN ACCOUNT SUCCESSFULLY
            cursor.execute('SELECT * FROM users WHERE email=%s', (data['email'],))
            results = cursor.fetchone()
            access_token, refresh_token = generate_tokens(results)

            return jsonify(status='ok', msg='new user added', access=access_token, refresh=refresh_token), 200
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

# SIGN IN
@users.route('/sign_in', methods=['POST'])
def sign_in():
    connection = None
    try:
        data = request.get_json()
        try:
            SignInInputs().load(data)
        except ValidationError as err:
            return jsonify(err.messages)

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM users WHERE email=%s', (data['email'],))
        results = cursor.fetchone()

        if not results:
            return jsonify(status='error', msg='email or password incorrect'), 401

        access = bcrypt.checkpw(data['password'].encode('utf-8'), results['hashed_password'].encode('utf-8'))
        if not access:
            return jsonify(status='error', msg='email or password incorrect'), 401

        access_token, refresh_token = generate_tokens(results)
        return jsonify(access=access_token, refresh=refresh_token), 200

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