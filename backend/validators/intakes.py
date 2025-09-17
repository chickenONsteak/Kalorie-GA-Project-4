from marshmallow import Schema, fields, validate, EXCLUDE

class FindIntakesByUserId(Schema):
    class Meta:
        unknown = EXCLUDE

    user_id = fields.UUID(required=True)

class AddNewIntake(Schema):
    class Meta:
        unknown = EXCLUDE

    user_id = fields.UUID(required=True)
    food_name = fields.Str(validate=validate.Length(min=1, error='food name has to be at least 1 character long'),
                           required=True)
    calories = fields.Int(required=True)
    carbohydrates = fields.Int(required=True)
    protein = fields.Int(required=True)
    fats = fields.Int(required=True)
    assumption_1 = fields.Str(required=True)
    assumption_2 = fields.Str(required=True)
    assumption_3 = fields.Str(required=True)

class DeleteIntakeById(Schema):
    class Meta:
        unknown = EXCLUDE

    intake_id = fields.Int(required=True)
