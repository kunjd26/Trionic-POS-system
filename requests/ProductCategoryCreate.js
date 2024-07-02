import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string()
        .required()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'Title must be a string.',
            'string.empty': 'Title is required.',
            'string.min': 'Title must be at least 1 character.',
            'string.max': 'Title must be at most 60 characters.',
            'any.required': 'Title is required.',
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
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateProductCategoryCreateRequest(req, res, next) {
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
