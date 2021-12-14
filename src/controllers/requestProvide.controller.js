const { getRequestsByUserId, checkRequestAccessed, accessRequest, deleteRequestById, updateRequest, createRequest} = require('../services/requestProvide.service');

async function postRequestProvide(req, res, next) {
  try {
    const request_provide = await createRequest(req.user.id, req.body);
    if (!request_provide) {
      return res.send("request provide not added.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  }
}

async function getRequestProvides(req, res, next) {
  try {
    const request_provide = await getRequestsByUserId(req.user.id);
    if (!request_provide) {
      return res.send("request provide not getted.");
    }
    return res.json(request_provide);
  } catch (error) {
    next(error);
  }
}

async function putRequestProvide(req, res, next) {
  try {
    const requestAccessed = await checkRequestAccessed(req.query.id);
    if (requestAccessed) {
      return res.send("Not Delete, admin accessed!");
    }
    const request_provide = await updateRequest(req.query.id, req.body);
    if (!request_provide) {
      return res.send("request provide not updated.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  }
  
}

async function accessRequestProvide(req, res, next) {
  try {
    const request_provide = await accessRequest(req.query.id, req.body);
    if (!request_provide) {
      return res.send("request provide not updated.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  } 
}

async function deleteRequestProvide(req, res, next) {
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
    postRequestProvide,
    getRequestProvides,
    putRequestProvide,
    accessRequestProvide,
    deleteRequestProvide,
};
