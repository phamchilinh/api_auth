const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNamesEnum = require('../_util/modelNames');


var user = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true, 
    },
	create_date: { 
        type: Date, 
        default: Date.now, 
    },
    update_date: { 
        type: Date, 
        default: null, 
    }
});

const modelName = modelNamesEnum.User;

module.exports = mongoose.model(modelName , user);
