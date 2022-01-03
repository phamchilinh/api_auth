const Joi = require('joi');

const handOverPost = Joi.object().keys({
    user_id: Joi.string().required(),
    device_id: Joi.string().required(),
    prev_user_id: Joi.string(),
});

const handOverPut = Joi.object().keys({
    user_id: Joi.string().required(),
    device_id: Joi.string().required(),
    prev_user_id: Joi.string(),
});

module.exports = {
    handOverPost,
    handOverPut,
};