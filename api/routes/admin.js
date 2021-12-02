const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const verify = require('../../auth/verifyToken');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/', verify, putUser);

router.get('/', getAll);
router.post('/', verify, postUser);
router.delete('/', verify, deleteUser);

module.exports = router;

async function authenticate(req, res) {
    try {
        await adminController.authenticate(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function register(req, res) {
    try {
        await adminController.register(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getAll(req, res) {
    try {
        await adminController.getAll(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function postUser(req, res) {
    try {
        await adminController.postUser(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function putUser(req, res) {
    try {
        await adminController.putUser(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteUser(req, res) {
    try {
        await adminController.deleteUser(req, res);
    } catch (error) {
        res.status(400).send(error);
    }
}