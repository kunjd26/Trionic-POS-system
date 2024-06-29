import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 1 character.',
            'string.max': 'Name must be at most 60 characters.',
            'any.required': 'Name is required.',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
            'string.base': 'Email must be a string.',
            'string.empty': 'Email is required.',
            'string.email': 'Invalid email format.',
            'any.required': 'Email is required.',
        }),
    role: Joi.string()
        .valid('admin', 'manager', 'staff')
        .messages({
            'string.base': 'Role must be a string.',
            'string.empty': 'Role is required.',
            'any.only': 'Role is invalid.',
            'any.required': 'Role is required.',
        }),
    phone: Joi.string()
        .pattern(/^\d{10}$/)
        .messages({
            'string.base': 'Phone must be a string.',
            'string.empty': 'Phone is required.',
            'string.pattern.base': 'Phone must be 10 digits long.',
            'any.required': 'Phone is required.',
        }),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)
        .messages({
            'string.base': 'Password must be a string.',
            'string.empty': 'Password is required.',
            'string.pattern.base': 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            'any.required': 'Password is required.',
        }),
    permissions: Joi.array()
        .items(Joi.string())
        .messages({
            'array.base': 'Permissions must be an array.',
            'any.required': 'Permissions is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateUserUpdateRequest(req, res, next) {
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
