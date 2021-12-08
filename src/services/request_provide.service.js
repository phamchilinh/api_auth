const Request_provide = require('../models/Request_provide');

const getRequestsByUserId = async (user_id) => {
    return Request_provide.find({ user_id });
};

const deleteRequestById = async (id) => {
    const query = { _id: id };
    const request_provide = Request_provide.findOneAndRemove(query);
    return request_provide;
};

const createRequest = async (id, request_provide) => {
    const request = new Request_provide({
        user_id: id,
        specifications: request_provide.specifications,
        create_date: request_provide.create_date
      });
  
    request.save();
    return request;
};

const updateRequest = async (id, request_provide) => {
    const query = { _id: id };
    const request = Request_provide.findOneAndUpdate(query, {
        specifications: request_provide.specifications
      }, {upsert:true});
    return request;
};

const accessRequest = async (id, request_provide) => {
    const query = { _id: id };
    const request = Request_provide.findOneAndUpdate(query, {
        accept_admin: request_provide.accept_admin
      }, {upsert:true});
    return request;
};

const checkRequestAccessed = async (id) => {
    const query = { _id: id, accept_admin: null };
    const request = await Request_provide.findOne(query);
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