from marshmallow import Schema, fields, validate, EXCLUDE

class AddOneGoalInputs(Schema):
    class Meta:
        unknown = EXCLUDE

    calorie_goal = fields.Int(required=True)
    carbohydrates_goal = fields.Int(required=True)
    protein_goal = fields.Int(required=True)
    fats_goal = fields.Int(required=True)