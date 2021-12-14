const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var request_return = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    device_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Device'
    },
	create_date: { 
        type: Date, 
        default: Date.now 
    },
    accept_admin: {
        type: Boolean,
        default: null
    }
});

module.exports = mongoose.model('Request_return', request_return);
