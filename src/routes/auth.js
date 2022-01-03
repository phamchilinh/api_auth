const express = require('express');
const router = express.Router();
const userService = require('../controllers/user.controller');
const requestProvide = require('../controllers/requestProvide.controller');
const deviceService = require('../controllers/device.controller');
const handOverService = require('../controllers/handOver.controller');
const requestReturn = require('../controllers/requestReturn.controller');
const requestTransfer = require('../controllers/requestTransfer.controller');
const { verifyRefreshToken} = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');


// authenticate
router.post('/login', validate(authValidation.login), userService.login, errorHandler);
router.post('/register', validate(authValidation.register), userService.register, errorHandler);
router.post('/refreshtoken', verifyRefreshToken, userService.refreshToken, errorHandler);          
router.post('/logout', verifyRefreshToken, userService.logout, errorHandler);  

module.exports = router;