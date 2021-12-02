const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var hand_over = new Schema({
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
    prev_user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    returned: {
        type: Boolean,
        default: false
    },
	create_date: { 
        type: Date, 
        default: Date.now 
    },
    date_returned: { 
        type: Date, 
        default: null 
    },
    accept_user: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Hand_over', hand_over);
