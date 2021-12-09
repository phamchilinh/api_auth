const { getRequestsByUserId, checkRequestAccessed, accessRequest, deleteRequestById, updateRequest, createRequest} = require('../services/request_turn.service');
const { returnDevice } = require('../services/hand_over.service');

async function postRequest_return(req, res, next) {
  try {
    const request_return = await createRequest(req.user.id, req.body);
    if (!request_return) {
      return res.send("request_return not added.");
    }
    return res.send({request_return: request_return._id});
  } catch (error) {
    next(error);
  }
}

async function getRequest_return(req, res, next) {
  try {
    const request_return = await getRequestsByUserId(req.user.id);
    if (!request_return) {
      return res.send("request_return not getted.");
    }
    return res.json(request_return);
  } catch (error) {
    next(error);
  }
}

async function putRequest_return(req, res, next) {
  try {
    const requestAccessed = await checkRequestAccessed(req.query.id);
    if (requestAccessed) {
        return res.send("Not Delete, admin accessed!");
    }
    const request_return = await updateRequest(req.query.id, req.body);
    if (!request_return) {
      return res.send("request_return not updated.");
    }
    return res.send({request_return: request_return._id});
  } catch (error) {
    next(error);
  }
  
}

async function accessRequest_return(req, res, next) {
  try {
    const request_return = await accessRequest(req.query.id, req.body);
    if (!request_return) {
        return res.send("request_return not updated.");
    }
    if (request_return.accept_admin === false) {
        next();
    }
    const hand_over = await returnDevice(request_return.user_id, request_return.device_id);
    if (!hand_over) {
        return res.send("return hand_over not updated.");
      }
    return res.send({request_return: request_return._id, hand_over: hand_over._id});
  } catch (error) {
    next(error);
  } 
}

async function deleteRequest_return(req, res, next) {
    try {
        const requestAccessed = await checkRequestAccessed(req.query.id);
        if (requestAccessed) {
          return res.send("Not Delete, admin accessed!");
        }
        const requestDeleted = await deleteRequestById(req.query.id);
        if (requestAccessed) {
          return res.send("Not Deleted!");
        }
        return res.send({requestDeleted: requestDeleted._id});
    } catch (error) {
      next(error);
    } 
}

module.exports = {
    postRequest_return,
    getRequest_return,
    putRequest_return,
    accessRequest_return,
    deleteRequest_return,
};
