const { roleRights } = require('../configs/roles');

const auth = (...requiredRights) => async (req, res, next) => {
  try {
    const user = req.user;
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights) {
      throw 'Access Denie';
    }
    next();
  } catch (error) {
    next(error);
  }

};
  
module.exports = auth;