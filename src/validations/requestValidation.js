const Joi = require('joi');

const request_provide = Joi.object().keys({
    specifications: Joi.string().required(),
});

const post_return = Joi.object().keys({
    user_id: Joi.string().required(),
    device_id: Joi.string().required(),
});

const put_return = Joi.object().keys({
    device_id: Joi.string().required(),
});

const acceptAdmin = Joi.object().keys({
    accept_admin: Joi.boolean().required()
});

module.exports = {
    request_provide,
    post_return,
    put_return,
    acceptAdmin,
};