const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var permission = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: modelNamesEnum.User, 
    },
    permission_type: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    }
});

const modelName = modelNamesEnum.Permission;

module.exports = mongoose.model(modelName, permission);
