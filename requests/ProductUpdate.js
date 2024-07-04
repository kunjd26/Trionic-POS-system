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
    description: Joi.string()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'description must be a string.',
            'string.min': 'description must be at least 1 character.',
            'string.max': 'description must be at most 300 characters.',
            'any.required': 'description is required.',
        }),
    barcode: Joi.string()
        .pattern(/^\d{13}$/)
        .messages({
            'string.base': 'barcode must be a string.',
            'string.pattern.base': 'barcode must be 13 digits long.',
            'any.required': 'barcode is required.',
        }),
    weight: Joi.number()
        .min(0.1)
        .messages({
            'number.base': 'weight must be a number.',
            'number.min': 'weight must be at least 0.1 grams.',
            'any.required': 'weight is required.',
        }),
    productCategoryId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'productCategoryId must be a string.',
            'any.required': 'productCategoryId is required.',
            'string.pattern.base': 'productCategoryId must be a valid MongoDB Object ID.',
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
