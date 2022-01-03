const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var hand_over = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.User,
    },
    device_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.Device,
    },
    prev_user_id: {
        type: Schema.Types.ObjectId, 
        default: null,
        ref: modelNamesEnum.User,
    },
    returned: {
        type: Boolean,
        default: false,
    },
	create_date: { 
        type: Date, 
        default: Date.now, 
    },
    date_returned: { 
        type: Date, 
        default: null, 
    },
    accept_user: {
        type: Boolean,
        default: null,
    }
});

const modelName = modelNamesEnum.Hand_over;

module.exports = mongoose.model(modelName, hand_over);
