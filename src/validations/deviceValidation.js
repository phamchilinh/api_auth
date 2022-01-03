const Joi = require('joi');

const devicePost = Joi.object().keys({
    name_device: Joi.string().required(),
    access_code: Joi.string().required(),
    device_type_id: Joi.string().required(),
    specifications: Joi.string().required(),
});

const devicePut = Joi.object().keys({
    name_device: Joi.string().required(),
    access_code: Joi.string().required(),
    device_type_id: Joi.string().required(),
    specifications: Joi.string().required(),
    status: Joi.boolean().required(),
});

module.exports = {
    devicePost,
    devicePut,
};