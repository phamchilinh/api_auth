const User = require('../models/User');
const Permission = require('../models/Permission');
const bcrypt = require('bcrypt');
const saltRounds = 8;

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const getAllUser = async () => {
    return await User.find();
};

const getRoleByUserID = async (id) => {
    return await Permission.findOne({ user_id: id });
};

const deleteUserByID = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return user;
};

const saveUser = async (user) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);
    const users = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: hashPassword
      });
  
    await users.save();
    return users;
};

const updateUser = async (id, user) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const users = await User.findByIdAndUpdate(id, {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        password: hashPassword,
        update_date: Date.now,
    });
    return users;
};


module.exports = {
    getUserByEmail,
    getRoleByUserID,
    deleteUserByID,
    saveUser,
    getAllUser,
    updateUser,
}