import User from '../api/users/model.js';
import logger from '../config/logger.js';

const routeNotFoundHandler = (req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { message, level = 'error' } = err;
  let { statusCode = 500 } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  // Validation Errors
  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  logger[level](log);

  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
};

const adminOnly = async (req, res, next) => {
  const { authData = {} } = req;
  const { _id } = authData;

  try {
    const userFound = await User.findById(_id).exec();

    if (!userFound || userFound.userType !== 'Administrador') {
      const message = 'Forbidden';

      next({
        success: false,
        message,
        statusCode: 403,
        type: 'warn',
      });
    } else {
      next();
    }
  } catch (error) {
    next(new Error(error));
  }
};

export { routeNotFoundHandler, errorHandler, adminOnly };
