const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var refresh_token = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Refresh_token', refresh_token);
