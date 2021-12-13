const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { checkRefreshToken } = require('../services/jwt.service');
dotenv.config();

const verifyAccessToken = async  (req, res, next) => {
    const token = req.header('accessToken');
    if(!token) return res.status(401).send('Access Denied');
    
    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

const verifyRefreshToken = async  (req, res, next) => {
    const token = req.header('refreshToken');
    try {
        const verified = jwt.verify(token, process.env.SECRET);
        const tokenExist = await checkRefreshToken(verified.id, token);
        if (!tokenExist) {
            throw new Error('Token not exist');
        }
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
};