const allRoles = {
    USER: ['authenticate', 'putUser', 'getOneUser', 'postRequest_provide', 
        'getRequest_provides', 'putRequest_provide', 'deleteRequest_provide',
        'userAccessHand_over', 'getHand_over', 
        'putRequest_return', 'getRequest_return', 'postRequest_return', 'deleteRequest_return'],
    ADMIN: ['authenticate', 'getUsers', 'postUser', 'deleteUser', 'getOneUser', 
        'accessRequest_provide', 'putDevice', 'getDevice', 'postDevice', 'putHand_over', 
        'getHand_over', 'postHand_over', 'accessRequest_return'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};


