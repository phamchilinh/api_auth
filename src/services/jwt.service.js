const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const refresh_token = require('../models/Refresh_token');

dotenv.config();

const signAccessToken = async (userid, role) => {
    return jwt.sign({ id: userid, role: role }, process.env.SECRET, { expiresIn: '1h' });
};

const signRefreshToken = async (userid, role) => {
    return jwt.sign({ id: userid, role: role }, process.env.SECRET, { expiresIn: '1y' });
};

const saveRefreshToken = async (userid, token) => {

    const refreshToken = refresh_token.findOneAndUpdate({user_id: userid}, {
        user_id: userid,
        token: token
    }, { upsert: true });
    return refreshToken;
};

const deleteRefreshToken = async (userid) => {

    const refreshToken = refresh_token.findOneAndRemove({user_id: userid});
    return refreshToken;
};

const checkRefreshToken = async (userid, token) => {
    const query = {user_id: userid, token: token};
    const refreshToken = await refresh_token.findOne(query);
    if(refreshToken) {
        return true;
    }
    return false;
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    saveRefreshToken,
    checkRefreshToken,
    deleteRefreshToken
};