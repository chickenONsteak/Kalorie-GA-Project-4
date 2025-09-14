from marshmallow import Schema, fields, validate, EXCLUDE

class FindGoalsByUserId(Schema):
    class Meta:
        unknown = EXCLUDE

    user_id = fields.UUID(required=True)

class AddOneGoalInputs(Schema):
    class Meta:
        unknown = EXCLUDE

    calorie_goal = fields.Int(required=True)
    carbohydrates_goal = fields.Int(required=True)
    protein_goal = fields.Int(required=True)
    fats_goal = fields.Int(required=True)