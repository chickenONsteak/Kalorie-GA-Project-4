import os
import json # FOR PARSING STR (OPENAI'S RESPONSE) TO JSON FORMAT
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

# PROMPT FOR OPENAI TO ESTIMATE CALORIES
def generate_prompt_for_calorie_estimation(description_of_food):
    calorie_estimation_prompt = f"""
    You are a nutrition assistant. 
    Given the name and/or description of a food item, estimate its calories and macronutrients (carbohydrates, protein, fat) 
    based on Singaporean portion sizes and local context.  
    
    Food description: "{description_of_food}"
    
    Requirements:
    - Only use kcal for calories.
    - Round calories and macros to the nearest whole number.
    - If the description is vague (e.g., "noodles"), suggest likely options to clarify:
      Example: "Do you mean mee pok, ban mian, or instant noodles?"
    - Output in strict JSON only. No extra text.
    - All string values (food_name, assumptions, required_details, messages) must be in sentence case:
      - The first word starts with a capital letter.
      - The rest of the sentence should be lowercase, unless proper nouns (e.g., Milo, Oreo).
    
    Output format (JSON):
    {{
    "food_name": "string",
    "calories": number,
    "carbohydrates_g": number,
    "protein_g": number,
    "fats_g": number,
    "confidence": 0-1 float (2 decimal places)
    "assumptions": [
        "assumption_1",
        "assumption_2",
        "assumption_3"
      ]
    }}
    Notes:
    - Replace "assumption_1", "assumption_2", and "assumption_3" with the **top 3 assumptions you made that most directly contributed to your calorie estimation**, based on missing or ambiguous information from the description.
    - These should be phrased clearly and concisely (e.g., "assumed standard hawker stall portion", "assumed fried not steamed", "assumed chicken thigh not breast").

    If confidence < {CONFIDENCE_THRESHOLD}, add:
    {{
        "low_confidence_message": "I’m not too confident. Can you tell me more about the dish?",
        "required_details": [
            "detail_1", 
            "detail_2", 
            "detail_3"
        ]
    }}
    - Replace "detail_1", "detail_2", and "detail_3" with the **top 3 specific details you need from the user to improve confidence the most**, dynamically based on the food description.
    """
    return calorie_estimation_prompt

# PROMPT FOR OPENAI TO GUESS THE DISH BASED ON IMAGE INPUT
def generate_prompt_for_food_recognition(uploaded_image):
    food_recognition_prompt = f"""
    You are a food recognition assistant specialised in Singaporean cuisine. 
    Your task is to identify the dish in the uploaded image with a description suitable for another AI model to estimate calories and macros.
    Take into account local foods, hawker dishes, snacks, bubble tea, kopi/teh drinks, and fusion dishes common in Singapore. 
    
    Uploaded image: {uploaded_image}
    
    Requirements:
    - If the food looks like a common Singaporean dish, use the local name (e.g., "char kway teow", "chicken rice", "mee pok", "milo dinosaur").
    - If the food is international, give a simple description (e.g., "pizza slice")..
    - Include portion details if possible.
    - Output in natural Singaporean English, as a local would describe it.
    - Do not give calories or nutrition yet.
    - Output in strict JSON only. No extra text.
    
    Output format (JSON):
    {{
    "food_name": "string",
    "description": "string",
    "confidence": 0-1 float (2 decimal places)
    }}
    
    If confidence < {CONFIDENCE_THRESHOLD}, add a key "low_confidence_message" and also a list of the top 3 specific 
    details you need from the user that would most increase your confidence in carrying out your task:
    {{
        "low_confidence_message": "I’m not fully sure what this dish is. Can you describe it for me?",
        "required_details": [
            "detail_1", 
            "detail_2", 
            "detail_3"
        ]
    }}
    - Replace "detail_1", "detail_2", and "detail_3". with the **top 3 specific details you need from the user to improve confidence the most**, dynamically based on the uploaded image.
    """
    return food_recognition_prompt

# GET CALORIE ESTIMATION BASED ON INPUT
@openai_services.route('/estimate_calories', methods=['PUT'])
def estimate_calories():
    try:
        data = request.get_json()
        # VALIDATE INPUT FIRST
        UserIntakeInput().load(data)

        prompt = generate_prompt_for_calorie_estimation(data['food_description'])

        # OPENAI RESPONSE
        response = client.responses.create(
            model="gpt-5-nano",
            input=prompt
        )
        # print(type(response.output_text))
        print(response.output_text)

        # PARSE STR TO JSON FORMAT
        response_json = json.loads(response.output_text)

        return jsonify(status='ok', msg='successful prompt', output=response_json), 200
    except ValidationError as err:
        return jsonify(err.messages)
    except SyntaxError as err:
        print(f'syntax error: {err}')
        return jsonify(status='error'), 400
    except Exception as err:
        print(f'error: {err}')
        return jsonify(status='error'), 400

# IDENTIFY FOOD BASED ON UPLOADED IMAGE
