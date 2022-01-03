const Joi = require('joi');

const requestProvide = Joi.object().keys({
    specifications: Joi.string().required(),
});

const postReturn = Joi.object().keys({
    device_id: Joi.string().required(),
});

const putReturn = Joi.object().keys({
    device_id: Joi.string().required(),
});

const postTransfer = Joi.object().keys({
    device_id: Joi.string().required(),
    next_user_id: Joi.string().required(),
});

const putTransfer = Joi.object().keys({
    device_id: Joi.string().required(),
    next_user_id: Joi.string().required(),
});

const acceptNextUser = Joi.object().keys({
    accept_next_user: Joi.boolean().required()
});

const acceptAdmin = Joi.object().keys({
    accept_admin: Joi.boolean().required()
});

module.exports = {
    requestProvide,
    postReturn,
    putReturn,
    postTransfer,
    putTransfer,
    acceptNextUser,
    acceptAdmin,
};