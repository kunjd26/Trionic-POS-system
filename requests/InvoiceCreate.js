import Joi from 'joi';

const schema = Joi.object({
    customerId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'customerId must be a string.',
            'string.empty': 'customerId is required.',
            'string.pattern.base': 'customerId must be a valid MongoDB Object ID.',
            'any.required': 'customerId is required.',
        }),
    orderId: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.base': 'orderId must be a string.',
            'string.empty': 'orderId is required.',
            'string.pattern.base': 'orderId must be a valid MongoDB Object ID.',
            'any.required': 'orderId is required.',
        }),
    invoiceDate: Joi.date()
        .required()
        .messages({
            'date.base': 'invoiceDate must be a valid date.',
            'date.empty': 'invoiceDate is required.',
            'any.required': 'invoiceDate is required.',
        }),
    tax: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            'number.base': 'tax must be a number.',
            'number.empty': 'tax is required.',
            'number.min': 'tax must be at least 0 percent.',
            'number.max': 'tax must be at most 100 percent.',
            'any.required': 'tax is required.',
        }),
    discount: Joi.number()
        .required()
        .min(0)
        .max(100)
        .messages({
            'number.base': 'discount must be a number.',
            'number.empty': 'discount is required.',
            'number.min': 'discount must be at least 0 percent.',
            'number.max': 'discount must be at most 100 percent.',
            'any.required': 'discount is required.',
        }),
    paymentType: Joi.string()
        .required()
        .valid('cash', 'cards', 'net-banking', 'upi')
        .messages({
            'string.base': 'paymentType must be a string.',
            'string.empty': 'paymentType is required.',
            'any.only': 'paymentType is invalid.',
            'any.required': 'paymentType is required.',
        })
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateInvoiceCreateRequest(req, res, next) {
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
