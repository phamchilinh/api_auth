const { getRequestsByUserId, checkUserAccessed, checkAdminAccessed, accessNextUser, accessAdmin, deleteRequestById, updateRequest, createRequest} = require('../services/request_transfer.service');
const { returnDevice } = require('../services/hand_over.service');

async function postRequest_transfer(req, res, next) {
  try {
    const request_transfer = await createRequest(req.user.id, req.body);
    if (!request_transfer) {
      return res.send("request_transfer not added.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  }
}

async function getRequest_transfer(req, res, next) {
  try {
    const request_transfer = await getRequestsByUserId(req.user.id);
    if (!request_transfer) {
      return res.send("request_transfer not getted.");
    }
    return res.json(request_transfer);
  } catch (error) {
    next(error);
  }
}

async function putRequest_transfer(req, res, next) {
  try {
    const userAccessed = await checkUserAccessed(req.query.id);
    if (userAccessed) {
        return res.send("Not update, request accessed!");
    }
    const adminAccessed = await checkAdminAccessed(req.query.id);
    if (adminAccessed) {
        return res.send("Not update, request accessed!");
    }
    const request_transfer = await updateRequest(req.query.id, req.body);
    if (!request_transfer) {
      return res.send("request_return not updated.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  }
  
}

async function adminAccess_transfer(req, res, next) {
    try {
        const userAccessed = await checkUserAccessed(req.query.id);
        if (!userAccessed) {
            return res.send("Not update, request not accessed by next user!");
        }
        const request_transfer = await accessAdmin(req.query.id, req.body);
        if (!request_transfer) {
            return res.send("request_transfer not updated.");
        }
        if (request_transfer.accept_admin === false) {
            next();
        }
        const hand_over = await returnDevice(request_transfer.user_id, request_transfer.device_id);
        if (!hand_over) {
            return res.send("return hand_over not updated.");
        }
        return res.send({request_transfer: request_transfer._id, hand_over: hand_over._id});
    } catch (error) {
      next(error);
    } 
}

async function userAccess_transfer(req, res, next) {
  try {
    const request_transfer = await accessNextUser(req.query.id, req.body);
    if (!request_transfer) {
        return res.send("request_return not updated.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  } 
}

async function deleteRequest_transfer(req, res, next) {
    try {
        const requestAccessed = await checkAdminAccessed(req.query.id);
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
    postRequest_transfer,
    getRequest_transfer,
    putRequest_transfer,
    adminAccess_transfer,
    userAccess_transfer,
    deleteRequest_transfer,
};
