const Joi = require('joi');

const device_post = Joi.object().keys({
    name_device: Joi.string().required(),
    access_code: Joi.string().required(),
    device_type_id: Joi.string().required(),
    specifications: Joi.string().required(),
});

const device_put = Joi.object().keys({
    name_device: Joi.string(),
    access_code: Joi.string(),
    device_type_id: Joi.string(),
    specifications: Joi.string(),
    status: Joi.boolean(),
});

module.exports = {
    device_post,
    device_put,
};