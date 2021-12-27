const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var request_return = new Schema({
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
	create_date: { 
        type: Date, 
        default: Date.now, 
    },
    accept_admin: {
        type: Boolean,
        default: null,
    }
});

const modelName = modelNamesEnum.RequestReturn;

module.exports = mongoose.model(modelName , request_return);
