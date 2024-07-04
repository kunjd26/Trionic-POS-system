import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string()
        .required()
        .min(1)
        .max(60)
        .messages({
            'string.base': 'title must be a string.',
            'string.empty': 'title is required.',
            'string.min': 'title must be at least 1 character.',
            'string.max': 'title must be at most 60 characters.',
            'any.required': 'title is required.',
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
