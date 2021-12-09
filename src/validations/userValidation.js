const Joi = require('joi');

const user_post = Joi.object().keys({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .min(8)
        .max(20)
        .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
});

const user_put = Joi.object().keys({
    password: Joi.string()
        .min(8)
        .max(20),
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
});

module.exports = {
    user_post,
    user_put,
};