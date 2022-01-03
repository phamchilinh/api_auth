const mongoose = require('mongoose');
const modelNamesEnum = require('../_util/modelNames');
const Schema = mongoose.Schema;

var device_type = new Schema({
    name_type: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    }
});

const modelName = modelNamesEnum.Device_type;

module.exports = mongoose.model(modelName, device_type);
