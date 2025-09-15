import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import request, jsonify, Blueprint
from marshmallow import ValidationError
from validators.openai_services import UserIntakeInput

# Threshold for confidence for OpenAI's calorie estimation
CONFIDENCE_THRESHOLD = 0.8

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_SECRET_API_KEY"))
openai_services = Blueprint('openai_services', __name__)

# PROMPT FOR OPENAI
def generate_prompt(dish_description, clarification=None):
    prompt = f"You are a nutrition assistant in Singapore. Estimate the total calories in the given description of the dish: '{dish_description}'."

    # IF CONFIDENCE IS LOW (<80%), ADD THIS STATEMENT INSIDE THE PROMPT AND REITERATE THE PROMPT AGAIN
    if clarification:
        prompt += f" The user clarified: \"{clarification}\".\n"

    prompt += """
    1. Identify the dish.
    2. Estimate calorie with a single number and not a range, rounded to the nearest whole number.
    3. Indicate your confidence from 0 to 1.
    4. List assumptions (portion size, cooking method, ingredients).
    
    Return a JSON object:
    {
      "food_name": "<name of dish>",
      "estimated_calories": <number>,
      "confidence": <0-1>,
      "assumptions": "<text>"
    }
    """
    return prompt

# GET CALORIE ESTIMATION BASED ON INPUT
@openai_services.route('/estimate_calories', methods=['PUT'])
def estimate_calories():
    try:
        data = request.get_json()
        try:
            UserIntakeInput().load(data)
        except ValidationError as err:
            return jsonify(err.messages)

        prompt = generate_prompt(data['dish_description'], data['clarification'])
        # OPENAI RESPONSE
        response = client.responses.create(
            model="gpt-5",
            input=prompt
        )

        print(response.output_text)

        return jsonify(status='ok', msg='successful prompt'), 200
    except SyntaxError as err:
        print(f'syntax error: {err}')
        return jsonify(status='error'), 400
    except Exception as err:
        print(f'error: {err}')
        return jsonify(status='error'), 400

