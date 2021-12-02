const express = require('express');
const router = express.Router();
const userService = require('../controllers/UserController');
const verify = require('../../auth/verifyToken');


// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/', verify, putUser);


module.exports = router;

async function authenticate(req, res) {
    try {
        await userService.authenticate(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function register(req, res) {
    try {
        await userService.register(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function putUser(req, res) {
    try {
        await userService.putUser(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}