const allRoles = {
    USER: ['authenticate', 'putUser', ],
    ADMIN: ['authenticate', 'getUsers', 'postUser', 'deleteUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};


