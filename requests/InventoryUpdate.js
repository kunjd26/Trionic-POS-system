import Joi from 'joi';

const schema = Joi.object({
    productStoreId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'productStoreId must be a string.',
            'string.pattern.base': 'productStoreId must be a valid MongoDB Object ID.',
            'any.required': 'productStoreId is required.',
        }),
    providerId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'providerId must be a string.',
            'string.pattern.base': 'providerId must be a valid MongoDB Object ID.',
            'any.required': 'providerId is required.',
        }),
    price: Joi.number()
        .min(0.1)
        .messages({
            'number.base': 'price must be a number.',
            'number.min': 'price must be at least 0.1 ruppee.',
            'any.required': 'price is required.',
        }),
    quantityUnit: Joi.string()
        .valid('kilogram', 'litter', 'piece')
        .messages({
            'string.base': 'quantityUnit must be a string.',
            'string.empty': 'quantityUnit is required.',
            'any.only': 'quantityUnit is invalid.',
            'any.required': 'quantityUnit is required.',
        }),
    availableQuantity: Joi.number()
        .min(0)
        .messages({
            'number.base': 'availableQuantityy must be a number.',
            'number.empty': 'availableQuantityy is required.',
            'any.required': 'availableQuantityy is required.',
        }),
    minimumQuantityLimit: Joi.number()
        .min(0)
        .messages({
            'number.base': 'minimumQuantityLimit limit must be a number.',
            'number.empty': 'minimumQuantityLimit limit is required.',
            'number.min': 'minimumQuantityLimit limit must be at least 0.',
            'any.required': 'minimumQuantityLimit limit is required.'
        }),
    maximumQuantityLimit: Joi.number()
        .min(0)
        .messages({
            'number.base': 'maximumQuantityLimit limit must be a number.',
            'number.empty': 'maximumQuantityLimit limit is required.',
            'number.min': 'maximumQuantityLimit limit must be at least 0.',
            'any.required': 'maximumQuantityLimit limit is required.'
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateInventoryUpdateRequest(req, res, next) {
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
