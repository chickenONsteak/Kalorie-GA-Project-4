from marshmallow import Schema, fields, validate, EXCLUDE

class AddOneUserInputs(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(error_messages={'error': 'not a valid email address'},required=True)
    first_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                     error='first name has to be 1 to 50 characters long'),
                            required=True)
    last_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                    error='last name has to be 1 to 50 characters long'),
                           required=True)
    password = fields.Str(validate=validate.Length(min=12, max=50,
                                                   error='password has to be 1 to 50 characters long'),
                          required=True)

class SignInInputs(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(error_messages={'error': 'not a valid email address'},required=True)
    password = fields.Str(validate=validate.Length(min=12, max=50,
                                                   error='password has to be 1 to 50 characters long'),
                          required=True)

class UpdateUserDetailsById(Schema):
    class Meta:
        unknown = EXCLUDE

    email = fields.Email(error_messages={'error': 'not a valid email address'}, required=True)
    first_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                     error='first name has to be 1 to 50 characters long'),
                            required=True)
    last_name = fields.Str(validate=validate.Length(min=1, max=50,
                                                    error='last name has to be 1 to 50 characters long'),
                           required=True)