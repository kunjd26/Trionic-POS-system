import Joi from 'joi';

const schema = Joi.object({
    userid: Joi.string()
        .required()
        .messages({
            'string.base': 'Userid must be a string.',
            'string.empty': 'Userid is required.',
            'any.required': 'Userid is required.',
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'Password must be a string.',
            'string.empty': 'Password is required.',
            'any.required': 'Password is required.',
        }),
}).unknown(false).messages({
    'object.unknown': 'Unknown field(s) in the request body.',
});

export default function validateUserSigninRequest(req, res, next) {
    try {
        const { error } = schema.validate(req.body);
        if (!error) {
            return next();
        }
        let errorMessage = error.details[0].message;
        res.status(422).send({ status: "fail", message: errorMessage });

    } catch (error) {
        next(error);
    }
}
