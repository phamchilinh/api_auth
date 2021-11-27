const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    userCode: {
        type: String, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true},
    password: { 
        type: String, 
        required: true },
    role:  { 
        type: String, 
        required: true,
        default: 'user'},
	dateAdded : { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
