import Service from './model.js';

const id = async (req, res, next, serviceId) => {
  try {
    const foundService = await Service.findById(serviceId);
    if (foundService) {
      req.serviceData = foundService;
      next();
    } else {
      const message = 'No se encontro el Servicio';

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
  const { body = {}, deviceData = {} } = req;
  const { id: deviceId = '' } = deviceData;

  body.deviceId = deviceId;

  const newService = new Service(body);

  try {
    const savedService = await newService.save();
    res.status(201).json({
      success: true,
      data: savedService,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// eslint-disable-next-line no-unused-vars
const read = (req, res, next) => {
  const { serviceData = {} } = req;

  res.json({
    success: true,
    data: serviceData,
  });
};

const update = async (req, res, next) => {
  const { serviceData = {}, body = {} } = req;

  Object.assign(serviceData, body);

  try {
    const updatedService = await serviceData.save();
    res.json({
      success: true,
      data: updatedService,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const all = async (req, res, next) => {
  const { deviceData = {} } = req;
  const { id: deviceId = '' } = deviceData;

  try {
    const services = await Service.find({ deviceId }).exec();
    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export { id, create, read, update, all };
