const { getRequestsByUserId, checkUserAccessed, checkAdminAccessed, accessNextUser, accessAdmin, deleteRequestById, updateRequest, createRequest} = require('../services/requestTransfer.service');
const { returnDevice } = require('../services/handOver.service');

async function postRequestTransfer(req, res, next) {
  try {
    const request_transfer = await createRequest(req.user.id, req.body);
    if (!request_transfer) {
      return res.send("request transfer not added.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  }
}

async function getRequestTransfer(req, res, next) {
  try {
    const request_transfer = await getRequestsByUserId(req.user.id);
    if (!request_transfer) {
      return res.send("request transfer not getted.");
    }
    return res.json(request_transfer);
  } catch (error) {
    next(error);
  }
}

async function putRequestTransfer(req, res, next) {
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
      return res.send("request return not updated.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  }
  
}

async function adminAccessTransfer(req, res, next) {
    try {
        const userAccessed = await checkUserAccessed(req.query.id);
        if (!userAccessed) {
            return res.send("Not update, request not accessed by next user!");
        }
        const request_transfer = await accessAdmin(req.query.id, req.body);
        if (!request_transfer) {
            return res.send("request transfer not updated.");
        }
        if (request_transfer.accept_admin === false) {
            next();
        }
        const hand_over = await returnDevice(request_transfer.user_id, request_transfer.device_id);
        if (!hand_over) {
            return res.send("return hand over not updated.");
        }
        return res.send({request_transfer: request_transfer._id, hand_over: hand_over._id});
    } catch (error) {
      next(error);
    } 
}

async function userAccessTransfer(req, res, next) {
  try {
    const request_transfer = await accessNextUser(req.query.id, req.body);
    if (!request_transfer) {
        return res.send("request return not updated.");
    }
    return res.send({request_transfer: request_transfer._id});
  } catch (error) {
    next(error);
  } 
}

async function deleteRequestTransfer(req, res, next) {
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
    postRequestTransfer,
    getRequestTransfer,
    putRequestTransfer,
    adminAccessTransfer,
    userAccessTransfer,
    deleteRequestTransfer,
};
