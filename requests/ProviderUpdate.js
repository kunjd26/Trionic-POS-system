import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'Name must be a string.',
            'string.min': 'Name must be at least 1 character.',
            'string.max': 'Name must be at most 60 characters.',
            'any.required': 'Name is required.',
        }),
    address: Joi.string()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'Address must be a string.',
            'string.min': 'Address must be at least 1 character.',
            'string.max': 'Address must be at most 300 characters.',
            'any.required': 'Address is required.',
        }),
    postalCode: Joi.string()
        .pattern(/^\d{6}$/)
        .messages({
            'string.base': 'PostalCode must be a string.',
            'string.pattern.base': 'PostalCode must be 6 digits long.',
            'any.required': 'PostalCode is required.',
        }),
    phone: Joi.string()
        .pattern(/^\d{10}$/)
        .messages({
            'string.base': 'Phone must be a string.',
            'string.pattern.base': 'Phone must be 10 digits long.',
            'any.required': 'Phone is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProviderUpdateRequest(req, res, next) {
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
