const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var request_transfer = new Schema({
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
    next_user_id: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
	create_date: { 
        type: Date, 
        default: Date.now 
    },
    accept_next_user: { 
        type: Boolean, 
        default: false 
    },
    accept_admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Request_transfer', request_transfer);
