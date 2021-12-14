const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var request_provide = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    specifications: {
        type: String,
        required: true
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

module.exports = mongoose.model('Request_provide', request_provide);
