const allRoles = {
    USER: ['authenticate', 'putUser', 'getOneUser', 'postRequestProvide', 
        'getRequestProvides', 'putRequestProvide', 'deleteRequestProvide',
        'userAccessHandOver', 'getHandOver', 
        'putRequestReturn', 'getRequestReturn', 'postRequestReturn', 'deleteRequestReturn',
        'putRequestTransfer', 'getRequestTransfer', 'postRequestTransfer', 'deleteRequestTransfer', 'userAccessTransfer'],
    ADMIN: ['authenticate', 'getUsers', 'postUser', 'deleteUser', 'getOneUser', 
        'accessRequest_provide', 'putDevice', 'getDevice', 'postDevice', 'putHandOver', 
        'getHandOver', 'postHandOver', 'accessRequestReturn', 'adminAccessTransfer'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};


