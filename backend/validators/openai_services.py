from marshmallow import Schema, fields, validate, EXCLUDE

class UserIntakeInput(Schema):
    class Meta:
        unknown = EXCLUDE

    food_description = fields.Str(validate=validate.Length(min=1, error='input has to be 1 to 500 characters long'),
                              required=True)