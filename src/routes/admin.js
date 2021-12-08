const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const request_provide = require('../controllers/request_provide.controller');
const deviceService = require('../controllers/device.controller');
const hand_overService = require('../controllers/hand_over.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');

// authenticate
router.post('/authenticate', userService.authenticate);

// user
router.put('/putUser', verify, auth('putUser'), userService.putUser, errorHandler);
router.get('/getUsers', verify, auth('getUsers'), userService.getUsers, errorHandler);
router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.post('/postUser', verify, auth('postUser'), userService.postUser, errorHandler);
router.delete('/deleteUser', verify, auth('deleteUser'), userService.deleteUser, errorHandler);
router.put('/accessRequest_provide', verify, auth('accessRequest_provide'), request_provide.accessRequest_provide, errorHandler);

// device
router.put('/putDevice', verify, auth('putDevice'), deviceService.putDevice, errorHandler);
router.get('/getDevice', verify, auth('getDevice'), deviceService.getDevice, errorHandler);
router.post('/postDevice', verify, auth('postDevice'), deviceService.postDevice, errorHandler);

// hand_over
router.put('/putHand_over', verify, auth('putHand_over'), hand_overService.putHand_over, errorHandler);
router.get('/getHand_over', verify, auth('getHand_over'), hand_overService.getHand_over, errorHandler);
router.post('/postHand_over', verify, auth('postHand_over'), hand_overService.postHand_over, errorHandler);

module.exports = router;
