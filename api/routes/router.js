const express = require('express');
const router = express.Router();
const userService = require('../controllers/UserController');
const verify = require('../auth/verifyToken');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/', verify, postUser);
router.put('/', verify, putUser);
router.delete('/', verify, deleteUser);

module.exports = router;

async function authenticate(req, res) {
    try {
        await userService.auth(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAll(req, res) {
    try {
        await userService.get(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function postUser(req, res) {
    try {
        await userService.post(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function putUser(req, res) {
    try {
        await userService.put(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteUser(req, res) {
    try {
        await userService.delete(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}