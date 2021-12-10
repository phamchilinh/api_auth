const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const request_provide = require('../controllers/request_provide.controller');
const deviceService = require('../controllers/device.controller');
const hand_overService = require('../controllers/hand_over.controller');
const request_return = require('../controllers/request_return.controller');
const request_transfer = require('../controllers/request_transfer.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const userValidation = require('../validations/userValidation');
const deviceValidation = require('../validations/deviceValidation');
const hand_overValidation = require('../validations/hand_overValidation');
const requestValidation = require('../validations/requestValidation');


// authenticate
router.post('/authenticate', validate(authValidation.login), userService.authenticate, errorHandler);

// user
router.put('/putUser', verify, validate(userValidation.user_put), auth('putUser'), userService.putUser, errorHandler);
router.get('/getUsers', verify, auth('getUsers'), userService.getUsers, errorHandler);
router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.post('/postUser', verify, validate(userValidation.user_post), auth('postUser'), userService.postUser, errorHandler);
router.delete('/deleteUser', verify, auth('deleteUser'), userService.deleteUser, errorHandler);

// accept request
router.put('/accessRequest_provide', verify, validate(requestValidation.acceptAdmin), auth('accessRequest_provide'), request_provide.accessRequest_provide, errorHandler);
router.put('/accessRequest_return', verify, validate(requestValidation.acceptAdmin), auth('accessRequest_return'), request_return.accessRequest_return, errorHandler);
router.put('/adminAccess_transfer', verify, validate(requestValidation.acceptAdmin), auth('adminAccess_transfer'), request_transfer.adminAccess_transfer, errorHandler);

// device
router.put('/putDevice', verify, validate(deviceValidation.device_put), auth('putDevice'), deviceService.putDevice, errorHandler);
router.get('/getDevice', verify, auth('getDevice'), deviceService.getDevice, errorHandler);
router.post('/postDevice', verify, validate(deviceValidation.device_post), auth('postDevice'), deviceService.postDevice, errorHandler);

// hand_over
router.put('/putHand_over', verify, validate(hand_overValidation.hand_over_put), auth('putHand_over'), hand_overService.putHand_over, errorHandler);
router.get('/getHand_over', verify, auth('getHand_over'), hand_overService.getHand_over, errorHandler);
router.post('/postHand_over', verify, validate(hand_overValidation.hand_over_post), auth('postHand_over'), hand_overService.postHand_over, errorHandler);

module.exports = router;
