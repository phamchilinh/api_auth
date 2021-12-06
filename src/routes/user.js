const express = require('express');
const router = express.Router();
const userService = require('../controllers/UserController');
const verify = require('../middlewares/verifyToken');
const { errorHandler } = require('../middlewares/error');
const auth = require('../middlewares/auth');


// routes
router.post('/authenticate', authenticate, errorHandler);

router.put('/putUser', verify, auth('putUser'), putUser, errorHandler);


module.exports = router;
