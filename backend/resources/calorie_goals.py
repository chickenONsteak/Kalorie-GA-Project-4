import psycopg2
from flask import request, jsonify, Blueprint
from db.db_pool import get_cursor, release_connection
from marshmallow import ValidationError
from validators.calorie_goals import AddOneGoalInputs

calorie_goals = Blueprint('calorie_goals', __name__)

# GET CALORIE GOAL BY USER ID
@calorie_goals.route('/calorie_goals', methods=['POST'])
def find_goals_by_user():
    connection = None
    try:
        data = request.get_json()
        try:
            AddOneGoalInputs().load(data)
        except ValidationError as err:
            return jsonify(err.messages)

        connection, cursor = get_cursor()
        cursor.execute('SELECT * FROM calorie_goals WHERE user_id=%s;', (data['user_id'],))
        results = cursor.fetchall()
        return jsonify(results), 200
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

# ADD CALORIE GOAL
@calorie_goals.route('/calorie_goals', methods=['PUT'])
def add_new_goal():
    connection = None
    try:
        data = request.get_json()
        try:
            AddOneGoalInputs().load(data)
        except ValidationError as err:
            return jsonify(err.messages)

        connection, cursor = get_cursor()
        cursor.execute('INSERT INTO calorie_goals (calorie_goal, carbohydrates_goal, protein_goal, fats_goal) VALUES (%s, %s, %s, %s);', (data['calorie_goal'], data['carbohydrates_goal'], data['protein_goal'], data['fats_goal']))
        connection.commit()
        return jsonify(status='ok', msg='new goal added'), 200
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