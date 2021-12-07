const allRoles = {
    USER: ['authenticate', 'putUser', 'getOneUser', 'postRequest_provide', 'getRequest_provides', 'putRequest_provide', 'deleteRequest_provide'],
    ADMIN: ['authenticate', 'getUsers', 'postUser', 'deleteUser', 'getOneUser', 'accessRequest_provide'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};


