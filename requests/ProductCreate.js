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
    description: Joi.string()
        .required()
        .min(1)
        .max(300)
        .messages({
            'string.base': 'description must be a string.',
            'string.empty': 'description is required.',
            'string.min': 'description must be at least 1 character.',
            'string.max': 'description must be at most 300 characters.',
            'any.required': 'description is required.',
        }),
    barcode: Joi.string()
        .pattern(/^\d{13}$/)
        .required()
        .messages({
            'string.base': 'barcode must be a string.',
            'string.empty': 'barcode is required.',
            'string.pattern.base': 'barcode must be 13 digits long.',
            'any.required': 'barcode is required.',
        }),
    weight: Joi.number()
        .required()
        .min(0.1)
        .messages({
            'number.base': 'weight must be a number.',
            'number.empty': 'weight is required.',
            'number.min': 'weight must be at least 0.1 grams.',
            'any.required': 'weight is required.',
        }),
    productCategoryId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'productCategoryId must be a string.',
            'string.empty': 'productCategoryId is required.',
            'any.required': 'productCategoryId is required.',
            'string.pattern.base': 'productCategoryId must be a valid MongoDB Object ID.',
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
