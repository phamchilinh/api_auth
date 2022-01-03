const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const handOverService = require('../controllers/handOver.controller');
const requestProvide = require('../controllers/requestProvide.controller');
const requestReturn = require('../controllers/requestReturn.controller');
const requestTransfer = require('../controllers/requestTransfer.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const userValidation = require('../validations/userValidation');
const handOverValidation = require('../validations/handOverValidation');
const requestValidation = require('../validations/requestValidation');


// user        
router.get('/getOneUser', verifyAccessToken, auth('getOneUser'), userService.getOneUser, errorHandler);
router.put('/putUser', verifyAccessToken, validate(userValidation.userPut), auth('putUser'), userService.editUser, errorHandler);

// request_provide
router.put('/putRequestProvide', verifyAccessToken, validate(requestValidation.requestProvide), auth('putRequestProvide'), requestProvide.putRequestProvide, errorHandler);
router.get('/getRequestProvides', verifyAccessToken, auth('getRequestProvides'), requestProvide.getRequestProvides, errorHandler);
router.post('/postRequestProvide', verifyAccessToken, validate(requestValidation.requestProvide), auth('postRequestProvide'), requestProvide.postRequestProvide, errorHandler);
router.delete('/deleteRequestProvide', verifyAccessToken, auth('deleteRequestProvide'), requestProvide.deleteRequestProvide, errorHandler);

// request return 
router.put('/putRequestReturn', verifyAccessToken, validate(requestValidation.putReturn), auth('putRequestReturn'), requestReturn.putRequestReturn, errorHandler);
router.get('/getRequestReturn', verifyAccessToken, auth('getRequestReturn'), requestReturn.getRequestReturn, errorHandler);
router.post('/postRequestReturn', verifyAccessToken, validate(requestValidation.postReturn), auth('postRequestReturn'), requestReturn.postRequestReturn, errorHandler);
router.delete('/deleteRequestReturn', verifyAccessToken, auth('deleteRequestReturn'), requestReturn.deleteRequestReturn, errorHandler);

// request transfer 
router.put('/putRequestTransfer', verifyAccessToken, validate(requestValidation.putTransfer), auth('putRequestTransfer'), requestTransfer.putRequestTransfer, errorHandler);
router.get('/getRequestTransfer', verifyAccessToken, auth('getRequestTransfer'), requestTransfer.getRequestTransfer, errorHandler);
router.post('/postRequestTransfer', verifyAccessToken, validate(requestValidation.postTransfer), auth('postRequestTransfer'), requestTransfer.postRequestTransfer, errorHandler);
router.delete('/deleteRequestTransfer', verifyAccessToken, auth('deleteRequestTransfer'), requestTransfer.deleteRequestTransfer, errorHandler);
router.put('/userAccessTransfer', verifyAccessToken, validate(requestValidation.acceptNextUser), auth('userAccessTransfer'), requestTransfer.userAccessTransfer, errorHandler);

// hand_overService
router.put('/userAccessHandOver', verifyAccessToken,  validate(handOverValidation.handOverPut), auth('userAccessHandOver'), handOverService.userAccessHandOver, errorHandler);
router.get('/getHandOver', verifyAccessToken, auth('getHandOver'), handOverService.getHandOver, errorHandler);

module.exports = router;
