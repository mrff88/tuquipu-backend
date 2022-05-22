import Device from './model.js';

const id = async (req, res, next, deviceId) => {
  try {
    const foundDevice = await Device.findById(deviceId);
    if (foundDevice) {
      req.deviceData = foundDevice;
      next();
    } else {
      const message = 'No se encontro el Dispositivo';

      next({
        message,
        statusCode: 404,
        type: 'warn',
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

const create = async (req, res, next) => {
  const { body = {}, clientData = {} } = req;
  const { id: clientId = '' } = clientData;

  body.clientId = clientId;

  const newDevice = new Device(body);

  try {
    const savedDevice = await newDevice.save();
    res.status(201).json({
      success: true,
      data: savedDevice,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// eslint-disable-next-line no-unused-vars
const read = (req, res, next) => {
  const { deviceData = {} } = req;

  res.json({
    success: true,
    data: deviceData,
  });
};

const update = async (req, res, next) => {
  const { deviceData = {}, body = {} } = req;

  Object.assign(deviceData, body);

  try {
    const updatedDevice = await deviceData.save();
    res.json({
      success: true,
      data: updatedDevice,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const all = async (req, res, next) => {
  const { clientData = {} } = req;
  const { id: clientId = '' } = clientData;

  try {
    const devices = await Device.find({ clientId }).exec();
    res.json({
      success: true,
      data: devices,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export { id, create, read, update, all };
