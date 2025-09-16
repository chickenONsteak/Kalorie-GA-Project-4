import psycopg2
from flask import request, jsonify, Blueprint
from db.db_pool import get_cursor, release_connection
from marshmallow import ValidationError
from validators.intakes import FindIntakesByUserId, AddNewIntake

intakes = Blueprint('intakes', __name__)

# GET ALL INTAKES BY USER ID
@intakes.route('/view_intakes', methods=['POST'])
def get_all_intakes_by_user():
    connection = None
    try:
        data = request.get_json()
        FindIntakesByUserId().load(data)

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM intakes WHERE user_id=%s', (data['user_id'],))
        results = cursor.fetchall()

        return jsonify(results), 200
    except ValidationError as err:
        return jsonify(err.messages)
    except psycopg2.Error as err:
        if connection:
            connection.rollback()
        print(f'database error: {err}')
        return jsonify(status='error'), 400
    except SyntaxError as err:
        if connection:
            connection.rollback()
        print(f'syntax error: {err}'), 400
    except Exception as err:
        if connection:
            connection.rollback()
        print(f'error: {err}')
        return jsonify(status='error'), 400
    finally:
        if connection:
            release_connection(connection)

# ADD NEW INTAKE
@intakes.route('/add_intake', methods=['PUT'])
def add_new_intake(required_details):
    connection = None
    try:
        data = request.get_json()
        AddNewIntake().load(data)

        connection, cursor = get_cursor()
        if required_details is None:
            cursor.execute('INSERT INTO intakes (user_id, food_name, calories, carbohydrates, protein, fats) '
                           'VALUES (%s, %s, %s, %s, %s, %s) '
                           'RETURNING id',
                           (data['user_id'], data['food_name'], data['calories'], data['carbohydrates'], data['protein'], data['fats']))
        else:
            cursor.execute('INSERT INTO intakes (user_id, food_name, calories, carbohydrates, protein, fats, additional_details_required_1, additional_details_required_2, additional_details_required_3) '
                           'VALUES (%s, %s, %s, %s, %s, %s) '
                           'RETURNING id',
                           (data['user_id'], data['food_name'], data['calories'], data['carbohydrates'], data['protein'], data['fats'], data['additional_details_required_1'], data['additional_details_required_2'], data['additional_details_required_3']))
        cursor.commit()
        return jsonify(status='ok', msg='new intake added'), 200
    except ValidationError as err:
        return jsonify(err.messages)
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