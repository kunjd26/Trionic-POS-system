import Joi from 'joi';

const schema = Joi.object({
    userId: Joi.string()
        .required()
        .messages({
            'string.base': 'userId must be a string.',
            'string.empty': 'userId is required.',
            'any.required': 'userId is required.',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'password must be a string.',
            'string.empty': 'password is required.',
            'any.required': 'password is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateUserSigninRequest(req, res, next) {
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
