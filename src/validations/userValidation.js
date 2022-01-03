const Joi = require('joi');

const userPost = Joi.object().keys({
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

const userPut = Joi.object().keys({
    password: Joi.string()
        .min(8)
        .max(20)
        .required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
});

module.exports = {
    userPost,
    userPut,
};