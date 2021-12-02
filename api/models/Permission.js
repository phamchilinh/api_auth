const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permission = new Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User' 
    },
    permisson_type: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Permission', permission);
