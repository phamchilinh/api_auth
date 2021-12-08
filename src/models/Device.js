const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        ref: 'Device_type'
    },
    specifications: {
        type: String,
        required: true
    },
    status: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('Device', device);
