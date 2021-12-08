const Device_type = require('../models/Device_type');
const Device = require('../models/Device');

const getDeviceById = async (id) => {
    return Device.find({ _id: id });
};

const createDevice = async (request_device) => {
    const device = new Device({
        name_device: request_device.name_device,
        access_code: request_device.access_code,
        device_type_id: request_device.device_type_id,
        specifications: request_device.specifications
    });
    device.save();
    return device;
};

const updateDevice = async (id, request_device) => {
    const query = { _id: id };
    const device = Device.findOneAndUpdate(query, {
        name_device: request_device.name_device,
        access_code: request_device.access_code,
        device_type_id: request_device.device_type_id,
        specifications: request_device.specifications,
        status: request_device.status
    }, {upsert:true});
    return device;
};

module.exports = {
    getDeviceById,
    createDevice,
    updateDevice
}