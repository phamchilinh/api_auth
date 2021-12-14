const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const requestProvide = require('../controllers/requestProvide.controller');
const deviceService = require('../controllers/device.controller');
const handOverService = require('../controllers/handOver.controller');
const requestReturn = require('../controllers/requestReturn.controller');
const requestTransfer = require('../controllers/requestTransfer.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const userValidation = require('../validations/userValidation');
const deviceValidation = require('../validations/deviceValidation');
const handOverValidation = require('../validations/handOverValidation');
const requestValidation = require('../validations/requestValidation');

// user
router.put('/putUser', verifyAccessToken, validate(userValidation.userPut), auth('putUser'), userService.editUser, errorHandler);
router.get('/getUsers', verifyAccessToken, auth('getUsers'), userService.getUsers, errorHandler);
router.get('/getOneUser', verifyAccessToken, auth('getOneUser'), userService.getOneUser, errorHandler);
router.post('/postUser', verifyAccessToken, validate(userValidation.userPost), auth('postUser'), userService.createUser, errorHandler);
router.delete('/deleteUser', verifyAccessToken, auth('deleteUser'), userService.deleteUser, errorHandler);

// accept request
router.put('/accessRequestProvide', verifyAccessToken, validate(requestValidation.acceptAdmin), auth('accessRequestProvide'), requestProvide.accessRequestProvide, errorHandler);
router.put('/accessRequestReturn', verifyAccessToken, validate(requestValidation.acceptAdmin), auth('accessRequestReturn'), requestReturn.accessRequestReturn, errorHandler);
router.put('/adminAccessTransfer', verifyAccessToken, validate(requestValidation.acceptAdmin), auth('adminAccessTransfer'), requestTransfer.adminAccessTransfer, errorHandler);

// device
router.put('/putDevice', verifyAccessToken, validate(deviceValidation.devicePut), auth('putDevice'), deviceService.putDevice, errorHandler);
router.get('/getDevice', verifyAccessToken, auth('getDevice'), deviceService.getDevice, errorHandler);
router.post('/postDevice', verifyAccessToken, validate(deviceValidation.devicePost), auth('postDevice'), deviceService.postDevice, errorHandler);

// hand_over
router.put('/putHandOver', verifyAccessToken, validate(handOverValidation.handOverPut), auth('putHandOver'), handOverService.putHandOver, errorHandler);
router.get('/getHandOver', verifyAccessToken, auth('getHandOver'), handOverService.getHandOver, errorHandler);
router.post('/postHandOver', verifyAccessToken, validate(handOverValidation.handOverPost), auth('postHandOver'), handOverService.postHandOver, errorHandler);

module.exports = router;
