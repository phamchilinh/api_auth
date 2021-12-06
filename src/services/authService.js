const userService = require('./userService');
const bcrypt = require('bcrypt');

const loginUser = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw 'Incorrect email or password';
    }

    return user;
};

module.exports = {
    loginUser
}