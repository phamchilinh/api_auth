const Joi = require('joi');

const request_provide = Joi.object().keys({
    specifications: Joi.string().required(),
});

const post_return = Joi.object().keys({
    device_id: Joi.string().required(),
});

const put_return = Joi.object().keys({
    device_id: Joi.string().required(),
});

const post_transfer = Joi.object().keys({
    device_id: Joi.string().required(),
    next_user_id: Joi.string().required(),
});

const put_transfer = Joi.object().keys({
    device_id: Joi.string(),
    next_user_id: Joi.string(),
});

const acceptNextUser = Joi.object().keys({
    accept_next_user: Joi.boolean().required()
});

const acceptAdmin = Joi.object().keys({
    accept_admin: Joi.boolean().required()
});

module.exports = {
    request_provide,
    post_return,
    put_return,
    post_transfer,
    put_transfer,
    acceptNextUser,
    acceptAdmin,
};