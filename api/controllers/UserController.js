const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/user');

dotenv.config();
const saltRounds = 8;

function parseUser(user) {
  return JSON.parse(
    JSON.stringify(user),
  );
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = parseUser(user);
  return userWithoutPassword;
}

async function authenticate(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Username or password is incorrect');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Username or password is incorrect');

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '7d' });
  return res.header('auth-token', token).send(token);
}

async function getAll(req, res) {
  const users = await User.find();
  const userOmitPass = users.map((u) => omitPassword(u));
  return res.json(userOmitPass);
}

async function postUser(req, res) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const users = new User({
    email: req.body.email,
    password: hashPassword,
    role: req.body.role,
  });

  await users.save();
  return res.send({users: users._id});
}

async function putUser(req, res) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const query = { _id: req.query._id };
  User.findOneAndUpdate(query, {
    role: req.body.role,
    password: hashPassword
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send(e);
    }
    res.send(raw);
  });
}

async function deleteUser(req, res) {
  const query = { _id: req.query._id };
  User.findOneAndRemove(
    query,
    (e, raw) => {
      if (e) {
        res.status(400).send(e);
      }
      res.send(raw);
    },
  );
}

module.exports = {
  auth: authenticate,
  get: getAll,
  post: postUser,
  put: putUser,
  delete: deleteUser
};
