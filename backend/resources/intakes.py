import psycopg2
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from db.db_pool import get_cursor, release_connection
from marshmallow import ValidationError
from validators.intakes import FindIntakesByUserId, AddNewIntake, DeleteIntakeById

intakes = Blueprint('intakes', __name__)

# GET ALL INTAKES BY USER ID
@intakes.route('/view_intakes', methods=['POST'])
# @jwt_required()
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

@intakes.route('/view_today_intakes', methods=['POST'])
# @jwt_required()
def get_today_intake_by_user():
    connection = None
    try:
        data = request.get_json()
        FindIntakesByUserId().load(data)

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM intakes '
                       'WHERE user_id=%s '
                       'AND CAST(created_at AS DATE) = CURRENT_DATE;',
                       (data['user_id'],))
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
@jwt_required()
def add_new_intake():
    connection = None
    try:
        data = request.get_json()
        AddNewIntake().load(data)

        connection, cursor = get_cursor()
        cursor.execute('INSERT INTO intakes (user_id, food_name, calories, carbohydrates, protein, fats, '
                       'assumption_1, assumption_2, assumption_3, '
                       'additional_details_required_1, additional_details_required_2, additional_details_required_3) '
                           'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) ',
                           (data['user_id'], data['food_name'], data['calories'], data['carbohydrates'], data['protein'], data['fats'],
                            data['assumption_1'], data['assumption_2'], data['assumption_3'],
                            data.get('additional_details_required_1'), data.get('additional_details_required_2'), data.get('additional_details_required_3')))
        connection.commit()

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

# UPDATE INTAKE
@intakes.route('/update_intake', methods=['PATCH'])
@jwt_required()
def update_intake():
    connection = None
    try:
        intake_id = request.json.get('intake_id')
        food_name = request.json.get('food_name')
        calories = request.json.get('calories')
        carbohydrates = request.json.get('carbohydrates')
        protein = request.json.get('protein')
        fats = request.json.get('fats')
        additional_details_required_1 = request.json.get('additional_details_required_1')
        additional_details_required_2 = request.json.get('additional_details_required_2')
        additional_details_required_3 = request.json.get('additional_details_required_3')

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM intakes WHERE id=%s', (intake_id,))
        results = cursor.fetchone()

        cursor.execute('UPDATE intakes '
                       'SET food_name=COALESCE(%s, %s), '
                       'calories=COALESCE(%s, %s), '
                       'carbohydrates=COALESCE(%s, %s), '
                       'protein=COALESCE(%s, %s), '
                       'fats=COALESCE(%s, %s), '
                       'additional_details_required_1=%s, '
                       'additional_details_required_2=%s, '
                       'additional_details_required_3=%s '
                       'WHERE id=%s',
                       (food_name, results['food_name'], calories, results['calories'],
                        carbohydrates, results['carbohydrates'], protein, results['protein'],
                        fats, results['fats'], additional_details_required_1,
                        additional_details_required_2, additional_details_required_3,
                        intake_id))
        connection.commit()

        return jsonify(status='ok', msg='intake successfully updated'), 200
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

# DELETE INTAKE
@intakes.route('/delete_intake', methods=['DELETE'])
@jwt_required()
def delete_intake():
    connection = None
    try:
        data = request.get_json()
        DeleteIntakeById().load(data)

        connection, cursor = get_cursor()
        cursor.execute('DELETE FROM intakes WHERE id=%s', (data['intake_id'],))
        connection.commit()

        return jsonify(status='ok', msg='intake deleted')
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

# GET TOTAL CALORIES AND MACROS ACROSS ALL INTAKES
@intakes.route('/view_all_nutritional_intakes', methods=['POST'])
@jwt_required()
def get_all_nutritional_intakes():
    connection = None
    try:
        data = request.get_json()
        FindIntakesByUserId().load(data)

        connection, cursor = get_cursor()
        # GET THE BREAKDOWN OF TOTAL CALORIES AND MACROS TAKEN IN THE PAST 7 DAYS
        cursor.execute('''
            SELECT 
                TO_CHAR(CAST(created_at AS DATE), 'YYYY-MM-DD') AS intake_date, 
                SUM(calories) as total_calories, 
                SUM(carbohydrates) as total_carbohydrates, 
                SUM(protein) as total_protein, 
                SUM(fats) as total_fats
            FROM intakes
            WHERE user_id=%s
            GROUP BY intake_date
            ORDER BY intake_date ASC
        ''', (data['user_id'],))

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

# GET TOTAL CALORIES AND MACROS ACROSS THE PAST 7 DAYS
@intakes.route('/view_past_week_nutritional_intakes', methods=['POST'])
@jwt_required()
def get_past_week_nutritional_intakes():
    connection = None
    try:
        data = request.get_json()
        FindIntakesByUserId().load(data)

        connection, cursor = get_cursor()
        # GET THE BREAKDOWN OF TOTAL CALORIES AND MACROS TAKEN IN THE PAST 7 DAYS
        cursor.execute('''
            SELECT 
                CAST(created_at AS DATE) AS intake_date, 
                SUM(calories) as total_calories, 
                SUM(carbohydrates) as total_carbohydrates, 
                SUM(protein) as total_protein, 
                SUM(fats) as total_fats
            FROM intakes
            WHERE user_id=%s AND created_at >= CURRENT_DATE - INTERVAL '7 days'
            GROUP BY intake_date
            ORDER BY intake_date ASC
        ''', (data['user_id'],))

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