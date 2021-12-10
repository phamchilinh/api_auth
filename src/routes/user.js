const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const hand_overService = require('../controllers/hand_over.controller');
const request_provide = require('../controllers/request_provide.controller');
const request_return = require('../controllers/request_return.controller');
const request_transfer = require('../controllers/request_transfer.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const userValidation = require('../validations/userValidation');
const hand_overValidation = require('../validations/hand_overValidation');
const requestValidation = require('../validations/requestValidation');


// routes
router.post('/authenticate', validate(authValidation.login), userService.authenticate, errorHandler);          

router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.put('/putUser', verify, validate(userValidation.user_put), auth('putUser'), userService.putUser, errorHandler);

// request_provide
router.put('/putRequest_provide', verify, validate(requestValidation.request_provide), auth('putRequest_provide'), request_provide.putRequest_provide, errorHandler);
router.get('/getRequest_provides', verify, auth('getRequest_provides'), request_provide.getRequest_provides, errorHandler);
router.post('/postRequest_provide', verify, validate(requestValidation.request_provide), auth('postRequest_provide'), request_provide.postRequest_provide, errorHandler);
router.delete('/deleteRequest_provide', verify, auth('deleteRequest_provide'), request_provide.deleteRequest_provide, errorHandler);

// request return 
router.put('/putRequest_return', verify, validate(requestValidation.put_return), auth('putRequest_return'), request_return.putRequest_return, errorHandler);
router.get('/getRequest_return', verify, auth('getRequest_return'), request_return.getRequest_return, errorHandler);
router.post('/postRequest_return', verify, validate(requestValidation.post_return), auth('postRequest_return'), request_return.postRequest_return, errorHandler);
router.delete('/deleteRequest_return', verify, auth('deleteRequest_return'), request_return.deleteRequest_return, errorHandler);

// request transfer 
router.put('/putRequest_transfer', verify, validate(requestValidation.put_transfer), auth('putRequest_transfer'), request_transfer.putRequest_transfer, errorHandler);
router.get('/getRequest_transfer', verify, auth('getRequest_transfer'), request_transfer.getRequest_transfer, errorHandler);
router.post('/postRequest_transfer', verify, validate(requestValidation.post_transfer), auth('postRequest_transfer'), request_transfer.postRequest_transfer, errorHandler);
router.delete('/deleteRequest_transfer', verify, auth('deleteRequest_transfer'), request_transfer.deleteRequest_transfer, errorHandler);
router.put('/userAccess_transfer', verify, validate(requestValidation.acceptNextUser), auth('userAccess_transfer'), request_transfer.userAccess_transfer, errorHandler);

// hand_overService
router.put('/userAccessHand_over', verify,  validate(hand_overValidation.hand_over_put), auth('userAccessHand_over'), hand_overService.userAccessHand_over, errorHandler);
router.get('/getHand_over', verify, auth('getHand_over'), hand_overService.getHand_over, errorHandler);

module.exports = router;
