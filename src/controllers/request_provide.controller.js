const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { getRequestsByUserId, checkRequestAccessed, accessRequest, deleteRequestById, updateRequest, createRequest} = require('../services/request_provide.service');

dotenv.config();

async function postRequest_provide(req, res, next) {
  try {
    const request_provide = await createRequest(req.user.id, req.body);
    if (!request_provide) {
        next("request_provide not added.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  }
}

async function getRequest_provides(req, res, next) {
  try {
    const request_provide = await getRequestsByUserId(req.user.id);
    if (!request_provide) {
        next("request_provide not getted.");
    }
    return res.json(request_provide);
  } catch (error) {
    next(error);
  }
}

async function putRequest_provide(req, res, next) {
  try {
    const request_provide = await updateRequest(req.query.id, req.body);
    if (!request_provide) {
        next("request_provide not updated.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  }
  
}

async function accessRequest_provide(req, res, next) {
  try {
    const request_provide = await accessRequest(req.query.id, req.body);
    if (!request_provide) {
        next("request_provide not updated.");
    }
    return res.send({request_provide: request_provide._id});
  } catch (error) {
    next(error);
  } 
}

async function deleteRequest_provide(req, res, next) {
    try {
        const requestAccessed = await checkRequestAccessed(req.query.id);
        console.log(requestAccessed);
        if (requestAccessed) {
            res.send("Not Delete, admin accessed!");
        }
        return res.send('{request_provide: request_provide._id}');
    } catch (error) {
      next(error);
    } 
}

module.exports = {
    postRequest_provide,
    getRequest_provides,
    putRequest_provide,
    accessRequest_provide,
    deleteRequest_provide,
};
