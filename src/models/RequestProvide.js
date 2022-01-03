const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var request_provide = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.User,
    },
    specifications: {
        type: String,
        required: true,
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

const modelName = modelNamesEnum.RequestProvide;

module.exports = mongoose.model(modelName, request_provide);
