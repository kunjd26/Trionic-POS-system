import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'name must be a string.',
            'string.min': 'name must be at least 1 character.',
            'string.max': 'name must be at most 60 characters.',
            'any.required': 'name is required.',
        }),
    address: Joi.string()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'address must be a string.',
            'string.min': 'address must be at least 1 character.',
            'string.max': 'address must be at most 300 characters.',
            'any.required': 'address is required.',
        }),
    postalCode: Joi.string()
        .pattern(/^\d{6}$/)
        .messages({
            'string.base': 'postalCode must be a string.',
            'string.pattern.base': 'postalCode must be 6 digits long.',
            'any.required': 'postalCode is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProductStoreUpdateRequest(req, res, next) {
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
