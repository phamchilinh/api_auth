const express = require('express');
const router = express.Router();
const userService = require('../controllers/UserController');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');

// routes
router.post('/authenticate', userService.authenticate);

router.put('/putUser', verify, auth('putUser'), userService.putUser, errorHandler);
router.get('/getUsers', verify, auth('getUsers'), userService.getUsers, errorHandler);
router.post('/postUser', verify, auth('getUsers'), userService.postUser, errorHandler);
router.delete('/deleteUser', verify, auth('getUsers'), userService.deleteUser, errorHandler);

module.exports = router;
