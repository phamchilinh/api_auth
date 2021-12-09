const Joi = require('joi');

const hand_over_post = Joi.object().keys({
    user_id: Joi.string().required(),
    device_id: Joi.string().required(),
    prev_user_id: Joi.string(),
});

const hand_over_put = Joi.object().keys({
    user_id: Joi.string(),
    device_id: Joi.string(),
    prev_user_id: Joi.string(),
});

module.exports = {
    hand_over_post,
    hand_over_put,
};