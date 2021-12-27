const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var refresh_token = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNamesEnum.User, 
    },
    token: {
        type: String,
        required: true,
    }
});

const modelName = modelNamesEnum.RefreshToken;

module.exports = mongoose.model(modelName, refresh_token);
