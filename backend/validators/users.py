from marshmallow import Schema, fields, validate, EXCLUDE

class AddOneUserInputs(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Str(validate=validate.Length(min=1, max=75,
                                                error='email has to be 1 to 75 characters long'),
                       required=True)
    first_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                     error='first name has to be 1 to 50 characters long'),
                            required=True)
    last_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                    error='last name has to be 1 to 50 characters long'),
                           required=True)
    password = fields.Str(validate=validate.Length(min=12, max=50,
                                                   error='password has to be 1 to 50 characters long'))