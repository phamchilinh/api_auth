const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var request_transfer = new Schema({
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
    next_user_id: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: modelNamesEnum.User,
    },
	create_date: { 
        type: Date, 
        default: Date.now,
    },
    accept_next_user: { 
        type: Boolean, 
        default: null,
    },
    accept_admin: {
        type: Boolean,
        default: null,
    }
});

const modelName = modelNamesEnum.RequestTransfer;

module.exports = mongoose.model(modelName , request_transfer);
