import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .required()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name is required.',
            'string.min': 'Name must be at least 1 character.',
            'string.max': 'Name must be at most 60 characters.',
            'any.required': 'Name is required.',
        }),
    address: Joi.string()
        .required()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'Address must be a string.',
            'string.empty': 'Address is required.',
            'string.min': 'Address must be at least 1 character.',
            'string.max': 'Address must be at most 300 characters.',
            'any.required': 'Address is required.',
        }),
    postalCode: Joi.string()
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.base': 'PostalCode must be a string.',
            'string.empty': 'PostalCode is required.',
            'string.pattern.base': 'PostalCode must be 6 digits long.',
            'any.required': 'PostalCode is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProductStoreCreateRequest(req, res, next) {
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
