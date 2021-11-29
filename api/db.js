const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.DB_LOCALHOST);
        console.log("successful!!!");
    } catch (error) {
        console.log("false!!!");
    }
}

module.exports = { connect };