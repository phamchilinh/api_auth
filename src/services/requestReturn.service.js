const Request_return = require('../models/RequestReturn');

const getRequestsByUserId = async (user_id) => {
    return await Request_return.findById(user_id);
};

const deleteRequestById = async (id) => {
    const request_return = await Request_return.findByIdAndRemove(id);
    return request_return;
};

const createRequest = async (id, request_return) => {
    const request = new Request_return({
        user_id: id,
        device_id: request_return.device_id
      });
  
    await request.save();
    return request;
};

const updateRequest = async (id, request_return) => {
    const request = await Request_return.findByIdAndUpdate(id, {
        device_id: request_return.device_id
      });
    return request;
};

const accessRequest = async (id, request_return) => {
    const request = await Request_return.findByIdAndUpdate(id, {
        accept_admin: request_return.accept_admin
      });
    return request;
};

const checkRequestAccessed = async (id) => {
    const query = { _id: id, accept_admin: null };
    const request = await Request_return.findOne(query);
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
    accessRequest,
    checkRequestAccessed
}