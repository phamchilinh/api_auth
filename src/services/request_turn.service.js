const Request_return = require('../models/Request_return');

const getRequestsByUserId = async (user_id) => {
    return Request_return.findById(user_id);
};

const deleteRequestById = async (id) => {
    const request_return = Request_return.findByIdAndRemove(id);
    return request_return;
};

const createRequest = async (id, request_return) => {
    const request = new Request_return({
        user_id: id,
        device_id: request_return.device_id
      });
  
    request.save();
    return request;
};

const updateRequest = async (id, request_return) => {
    const request = Request_return.findByIdAndUpdate(id, {
        device_id: request_return.device_id
      });
    return request;
};

const accessRequest = async (id, request_return) => {
    const request = Request_return.findByIdAndUpdate(id, {
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