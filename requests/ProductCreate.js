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
    description: Joi.string()
        .required()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description is required.',
            'string.min': 'Description must be at least 1 character.',
            'string.max': 'Description must be at most 300 characters.',
            'any.required': 'Description is required.',
        }),
    barcode: Joi.string()
        .pattern(/^\d{13}$/)
        .required()
        .messages({
            'string.base': 'Barcode must be a string.',
            'string.empty': 'Barcode is required.',
            'string.pattern.base': 'Barcode must be 13 digits long.',
            'any.required': 'Barcode is required.',
        }),
    weight: Joi.number()
        .required()
        .min(0.1)
        .messages({
            'number.base': 'Weight must be a number.',
            'number.empty': 'Weight is required.',
            'number.min': 'Weight must be at least 0.1 grams.',
            'any.required': 'Weight is required.',
        }),
    productCategoryId: Joi.string()
        .required()
        .messages({
            'string.base': 'ProductCategoryId must be a string.',
            'string.empty': 'ProductCategoryId is required.',
            'any.required': 'ProductCategoryId is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProductCreateRequest(req, res, next) {
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
