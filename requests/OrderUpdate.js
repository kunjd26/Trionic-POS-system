import Joi from 'joi';

const schema = Joi.object({
    orderDate: Joi.date()
        .messages({
            'date.base': 'orderDate must be a valid date.',
            'any.required': 'orderDate is required.',
        }),
    orderType: Joi.string()
        .valid('online', 'offline')
        .messages({
            'string.base': 'orderType must be a string.',
            'any.only': 'orderType is invalid.',
            'any.required': 'orderType is required.',
        }),
    status: Joi.string()
        .valid('pending', 'processing', 'completed', 'cancelled')
        .messages({
            'string.base': 'status must be a string.',
            'any.only': 'status is invalid.',
            'any.required': 'status is required.',
        }),
    orderDetails: Joi.array().items(
        Joi.object({
            inventoryId: Joi.string()
                .required()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .messages({
                    'string.base': 'inventoryId must be a string.',
                    'string.empty': 'inventoryId is required.',
                    'string.empty': 'inventoryId is required.',
                    'string.pattern.base': 'inventoryId must be a valid MongoDB Object ID.',
                    'any.required': 'inventoryId is required.',
                }),
            quantity: Joi.number()
                .required()
                .min(1)
                .messages({
                    'number.base': 'quantity must be a number.',
                    'number.empty': 'quantity is required.',
                    'number.min': 'quantity must be at least 1.',
                    'any.required': 'quantity is required.',
                })
        }).required().messages({
            'object.base': 'array must be contain an object.',
            'object.empty': 'array not be empty.',
            'object.includesRequiredUnknowns': 'orderDetails must contain valid inventory items.',
            'any.required': 'orderDetails data required in array.',
        })
    ).messages({
        'array.base': 'orderDetails must be an array.',
        'array.includesRequiredUnknowns': 'orderDetails must contain valid inventory items.',
        'any.required': 'orderDetails is required.',
    }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateOrderUpdateRequest(req, res, next) {
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
