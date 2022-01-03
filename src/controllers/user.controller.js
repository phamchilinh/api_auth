const { loginUser, registerUser, signAccessToken, signRefreshToken, saveRefreshToken, deleteRefreshToken } = require('../services/auth.service');
const {getRoleByUserID, getUserByEmail, deleteUserByID, saveUser, getAllUser, updateUser} = require('../services/user.service');
const { omitPassword } = require('../_util/user');


async function login(req, res, next) {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (!user) return res.status(400).send('Username or password is incorrect');

    const roles = await getRoleByUserID(user._id);
    const accessToken = await signAccessToken(user._id, roles.permission_type);
    const refreshToken = await signRefreshToken(user._id, roles.permission_type);
    await saveRefreshToken(user._id, refreshToken);
    return res.json({accessToken, refreshToken});
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    return res.json({"user": user._id});
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const user = req.user;
    const accessToken = await signAccessToken(user.id, user.role);
    const refreshToken = await signRefreshToken(user.id, user.role);
    await saveRefreshToken(user.id, refreshToken);
    return res.json({accessToken, refreshToken});
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const user = req.user;
    await deleteRefreshToken(user.id);
    return res.json({refreshToken: user.id});
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const oldUser = await getUserByEmail(req.body.email);
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    const users = await saveUser(req.body);
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

async function getOneUser(req, res, next) {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).send("User Not Exist.");
    }
    const userOmitPass = await omitPassword(user);
    return res.send({user: userOmitPass});
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    const users = await updateUser(req.user.id, req.body);
    return res.send({users: users._id});
  } catch (error) {
    next(error);
  }
  
}

async function deleteUser(req, res, next) {
  try {
    const user = await deleteUserByID(req.query.id);
    if (!user) {
      next();
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
  login,
  register,
  refreshToken,
  logout,
  getUsers,
  createUser,
  editUser,
  deleteUser,
  getOneUser,
};
