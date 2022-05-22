import Client from './model.js';

const id = async (req, res, next, clientId) => {
  try {
    const foundClient = await Client.findById(clientId).exec();
    if (foundClient) {
      req.clientData = foundClient;
      next();
    } else {
      const message = `No se encontro al cliente`;

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
  const { body = {} } = req;
  const newClient = new Client(body);

  try {
    const savedClient = await newClient.save();
    res.status(201).json({
      success: true,
      data: savedClient,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// eslint-disable-next-line no-unused-vars
const read = (req, res, next) => {
  const { clientData = {} } = req;

  res.json({
    success: true,
    data: clientData,
  });
};

const update = async (req, res, next) => {
  const { clientData = {}, body = {} } = req;

  Object.assign(clientData, body);

  try {
    const updatedClient = await clientData.save();
    res.json({
      success: true,
      data: updatedClient,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const all = async (req, res, next) => {
  try {
    const clients = await Client.find().exec();
    res.json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export { id, create, read, update, all };
