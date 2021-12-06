const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Permission = require('../models/Permission');
const { loginUser } = require('../services/authService');
const {getRoleByUserID, getUserByEmail, deleteUserByID, createUser, getAllUser, updateUser} = require('../services/userService');
const { omitPassword } = require('../utils/user');

dotenv.config();

async function authenticate(req, res, next) {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (!user) return res.status(400).send('Username or password is incorrect');

    const roles = await getRoleByUserID(user._id);
    const token = jwt.sign({ id: user._id, role: roles.permisson_type }, process.env.SECRET, { expiresIn: '5h' });
    return res.send({accessToken: token});
  } catch (error) {
    next(error);
  }
}

async function postUser(req, res, next) {
  try {
    const oldUser = await getUserByEmail(req.body.email);
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    const users = await createUser(req.body);
    return res.send({users: users._id});
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await getAllUser();
    const userOmitPass = await users.map((u) => omitPassword(u));
    return res.json(userOmitPass);
  } catch (error) {
    next(error);
  }
}

async function putUser(req, res, next) {
  try {
    const users = await updateUser(req.user.id, req.body);
    return res.send({users: users._id});
  } catch (error) {
    next(error);
  }
  
}

async function deleteUser(req, res, next) {
  try {
    const user = await deleteUserByID(req.query._id);
    if (!user) {
      next();
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
  authenticate: authenticate,
  getUsers: getUsers,
  postUser: postUser,
  putUser: putUser,
  deleteUser: deleteUser
};
