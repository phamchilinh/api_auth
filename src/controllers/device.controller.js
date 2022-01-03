const { getDeviceById, createDevice, updateDevice } = require('../services/device.service');

async function postDevice(req, res, next) {
  try {
    const device = await createDevice(req.body);
    if (!device) {
      return res.send("device not added.");
    }
    return res.send({device: device._id});
  } catch (error) {
    next(error);
  }
}

async function getDevice(req, res, next) {
  try {
    const device = await getDeviceById(req.query.id);
    if (!device) {
      return res.send("No device by this ID");
    }
    return res.json(device);
  } catch (error) {
    next(error);
  }
}

async function putDevice(req, res, next) {
  try {
    const device = await updateDevice(req.query.id, req.body);
    if (!device) {
      return res.send("device not updated.");
    }
    return res.send({device: device._id});
  } catch (error) {
    next(error);
  }
  
}

module.exports = {
    postDevice,
    getDevice,
    putDevice,
};
