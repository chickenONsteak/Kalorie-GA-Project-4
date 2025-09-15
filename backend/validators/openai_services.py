from marshmallow import Schema, fields, validate, EXCLUDE

class UserIntakeInput(Schema):
    class Meta:
        unknown = EXCLUDE

    intake_input = fields.Str(validate=validate.Length(min=1, max=500, error='input has to be 1 to 500 characters long'),
                              required=True)