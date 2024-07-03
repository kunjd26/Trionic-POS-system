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
    description: Joi.string()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'Description must be a string.',
            'string.min': 'Description must be at least 1 character.',
            'string.max': 'Description must be at most 300 characters.',
            'any.required': 'Description is required.',
        }),
    barcode: Joi.string()
        .pattern(/^\d{13}$/)
        .messages({
            'string.base': 'Barcode must be a string.',
            'string.pattern.base': 'Barcode must be 13 digits long.',
            'any.required': 'Barcode is required.',
        }),
    weight: Joi.number()
        .min(0.1)
        .messages({
            'number.base': 'Weight must be a number.',
            'number.min': 'Weight must be at least 0.1 grams.',
            'any.required': 'Weight is required.',
        }),
    productCategoryId: Joi.string()
        .messages({
            'string.base': 'ProductCategoryId must be a string.',
            'any.required': 'ProductCategoryId is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProductUpdateRequest(req, res, next) {
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
