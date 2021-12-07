const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const request_provide = require('../controllers/request_provide.controller');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');

// routes
router.post('/authenticate', userService.authenticate);

router.put('/putUser', verify, auth('putUser'), userService.putUser, errorHandler);
router.get('/getUsers', verify, auth('getUsers'), userService.getUsers, errorHandler);
router.get('/getOneUser', verify, auth('getOneUser'), userService.getOneUser, errorHandler);
router.post('/postUser', verify, auth('getUsers'), userService.postUser, errorHandler);
router.delete('/deleteUser', verify, auth('getUsers'), userService.deleteUser, errorHandler);
router.put('/accessRequest_provide', verify, auth('accessRequest_provide'), request_provide.accessRequest_provide, errorHandler);

module.exports = router;
