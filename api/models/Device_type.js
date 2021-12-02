const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var device_type = new Schema({
    name_type: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Device_type', device_type);
