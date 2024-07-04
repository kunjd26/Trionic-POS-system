import Joi from 'joi';

const schema = Joi.object({
    productId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'productId must be a string.',
            'string.empty': 'productId is required.',
            'string.pattern.base': 'productId must be a valid MongoDB Object ID.',
            'any.required': 'productId is required.',
        }),
    productStoreId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'productStoreId must be a string.',
            'string.empty': 'productStoreId is required.',
            'string.pattern.base': 'productStoreId must be a valid MongoDB Object ID.',
            'any.required': 'productStoreId is required.',
        }),
    providerId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'providerId must be a string.',
            'string.empty': 'providerId is required.',
            'string.pattern.base': 'providerId must be a valid MongoDB Object ID.',
            'any.required': 'providerId is required.',
        }),
    price: Joi.number()
        .required()
        .min(0.1)
        .messages({
            'number.base': 'price must be a number.',
            'number.empty': 'price is required.',
            'number.min': 'price must be at least 0.1 ruppee.',
            'any.required': 'price is required.',
        }),
    quantityUnit: Joi.string()
        .required()
        .valid('gram', 'milliliter', 'piece')
        .messages({
            'string.base': 'quantityUnit must be a string.',
            'string.empty': 'quantityUnit is required.',
            'any.only': 'quantityUnit is invalid.',
            'any.required': 'quantityUnit is required.',
        }),
    availableQuantity: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': 'availableQuantity must be a number.',
            'number.empty': 'availableQuantity is required.',
            'number.min': 'availableQuantity must be greater than or equal to minimum quantity limit.',
            'number.max': 'availableQuantity must be less than or equal to maximum quantity limit.',
            'any.required': 'availableQuantity is required.',
        }),
    minimumQuantityLimit: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': 'minimumQuantityLimit limit must be a number.',
            'number.empty': 'minimumQuantityLimit limit is required.',
            'number.min': 'minimumQuantityLimit limit must be at least 0.',
            'number.max': 'minimumQuantityLimit limit must be less than or equal to maximum quantity limit.',
            'any.required': 'minimumQuantityLimit limit is required.',
        }),
    maximumQuantityLimit: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': 'maximumQuantityLimit limit must be a number.',
            'number.empty': 'maximumQuantityLimit limit is required.',
            'any.required': 'maximumQuantityLimit limit is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateInventoryCreateRequest(req, res, next) {
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
