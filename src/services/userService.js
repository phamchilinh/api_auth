const User = require('../models/User');
const Permission = require('../models/Permission');
const bcrypt = require('bcrypt');
const saltRounds = 8;

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const getAllUser = async () => {
    return User.find();
};

const getRoleByUserID = async (id) => {
    return Permission.findOne({ user_id: id });
};

const deleteUserByID = async (id) => {
    const query = { _id: id };
    const user = User.findOneAndRemove(query);
    return user;
};

const createUser = async (user) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);
    const users = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: hashPassword,
        create_date: user.create_date,
        update_date: user.update_date
      });
  
    users.save();
    return users;
};

const updateUser = async (id, user) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const query = { _id: id };
    const users = User.findOneAndUpdate(query, {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        password: hashPassword,
        create_date: user.create_date,
        update_date: user.update_date
    }, {upsert:true});
    return users;
};


module.exports = {
    getUserByEmail,
    getRoleByUserID,
    deleteUserByID,
    createUser,
    getAllUser,
    updateUser,
}