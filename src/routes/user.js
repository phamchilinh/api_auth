const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const hand_overService = require('../controllers/hand_over.controller');
const request_provide = require('../controllers/request_provide.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');


// routes
router.post('/authenticate', userService.authenticate, errorHandler);          

router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.put('/putUser', verify, auth('putUser'), userService.putUser, errorHandler);

// request_provide
router.put('/putRequest_provide', verify, auth('putRequest_provide'), request_provide.putRequest_provide, errorHandler);
router.get('/getRequest_provides', verify, auth('getRequest_provides'), request_provide.getRequest_provides, errorHandler);
router.post('/postRequest_provide', verify, auth('postRequest_provide'), request_provide.postRequest_provide, errorHandler);
router.delete('/deleteRequest_provide', verify, auth('deleteRequest_provide'), request_provide.deleteRequest_provide, errorHandler);

// hand_overService
router.put('/userAccessHand_over', verify, auth('userAccessHand_over'), hand_overService.userAccessHand_over, errorHandler);
router.get('/getHand_over', verify, auth('getHand_over'), hand_overService.getHand_over, errorHandler);

module.exports = router;
