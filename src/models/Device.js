const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var device = new Schema({
    name_device: {
        type: String,
        required: true
    },
    access_code: {
        type: String,
        required: true,
        unique: true
    },
    device_type_id: {
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: modelNamesEnum.Device_type
    },
    specifications: {
        type: String,
        required: true,
    },
    status: { 
        type: Boolean, 
        default: false, 
    }
});

const modelName = modelNamesEnum.Device;

module.exports = mongoose.model(modelName, device);
