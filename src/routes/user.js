const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const request_provide = require('../controllers/request_provide.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');


// routes
router.post('/authenticate', userService.authenticate, errorHandler);

router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.put('/putUser', verify, auth('putUser'), userService.putUser, errorHandler);
router.put('/putRequest_provide', verify, auth('putRequest_provide'), request_provide.putRequest_provide, errorHandler);
router.get('/getRequest_provides', verify, auth('getRequest_provides'), request_provide.getRequest_provides, errorHandler);
router.post('/postRequest_provide', verify, auth('postRequest_provide'), request_provide.postRequest_provide, errorHandler);
router.delete('/deleteRequest_provide', verify, auth('deleteRequest_provide'), request_provide.deleteRequest_provide, errorHandler);


module.exports = router;
