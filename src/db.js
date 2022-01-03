const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;
const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};
async function connect() {
    try {
        await mongoose.connect(dbConnectionURL.LOCALURL);
        console.log("successful!!!");
    } catch (error) {
        console.log("false!!!");
    }
}

module.exports = { connect };