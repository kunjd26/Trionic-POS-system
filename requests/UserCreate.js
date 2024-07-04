import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .required()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'name must be a string.',
            'string.empty': 'name is required.',
            'string.min': 'name must be at least 1 character.',
            'string.max': 'name must be at most 60 characters.',
            'any.required': 'name is required.',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'email must be a string.',
            'string.empty': 'email is required.',
            'string.email': 'Invalid email format.',
            'any.required': 'email is required.',
        }),
    role: Joi.string()
        .valid('admin', 'manager', 'staff')
        .required()
        .messages({
            'string.base': 'role must be a string.',
            'string.empty': 'role is required.',
            'any.only': 'role is invalid.',
            'any.required': 'role is required.',
        }),
    phone: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            'string.base': 'phone must be a string.',
            'string.empty': 'phone is required.',
            'string.pattern.base': 'phone must be 10 digits long.',
            'any.required': 'phone is required.',
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)
        .required()
        .messages({
            'string.base': 'password must be a string.',
            'string.empty': 'password is required.',
            'string.pattern.base': 'password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            'any.required': 'password is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateUserCreateRequest(req, res, next) {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            let errorMessage = error.details[0].message;
            return res.status(422).send({ status: "fail", message: errorMessage });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
