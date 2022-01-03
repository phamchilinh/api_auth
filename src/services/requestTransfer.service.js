const Request_transfer = require('../models/RequestTransfer');

const getRequestsByUserId = async (user_id) => {
    return await Request_transfer.findById(user_id);
};

const deleteRequestById = async (id) => {
    const request_transfer = await Request_transfer.findByIdAndRemove(id);
    return request_transfer;
};

const createRequest = async (id, request_transfer) => {
    const request = new Request_transfer({
        user_id: id,
        device_id: request_transfer.device_id,
        next_user_id: request_transfer.next_user_id
      });
  
    await request.save();
    return request;
};

const updateRequest = async (id, request_transfer) => {
    const request = await Request_transfer.findByIdAndUpdate(id, {
        device_id: request_transfer.device_id,
        next_user_id: request_transfer.next_user_id
      });
    return request;
};

const accessNextUser = async (id, request_transfer) => {
    const request = await Request_transfer.findByIdAndUpdate(id, {
        accept_next_user: request_transfer.accept_next_user
      });
    return request;
};

const accessAdmin = async (id, request_transfer) => {
    const request = await Request_transfer.findByIdAndUpdate(id, {
        accept_admin: request_transfer.accept_admin
      });
    return request;
};

const checkAdminAccessed = async (id) => {
    const query = { _id: id, accept_admin: null };
    const request = await Request_transfer.findOne(query);
    if (request) {
        return false;
    }
    return true;
};

const checkUserAccessed = async (id) => {
    const query = { _id: id, accept_next_user: null };
    const request = await Request_transfer.findOne(query);
    if (request) {
        return false;
    }
    return true;
};

module.exports = {
    getRequestsByUserId,
    deleteRequestById,
    createRequest,
    updateRequest,
    accessNextUser,
    accessAdmin,
    checkAdminAccessed,
    checkUserAccessed,
}