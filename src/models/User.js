const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
	create_date: { 
        type: Date, 
        default: Date.now 
    },
    update_date: { 
        type: Date, 
        default: null 
    }
});

module.exports = mongoose.model('User', user);
