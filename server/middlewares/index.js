import logger from '../config/logger.js';

// eslint-disable-next-line no-unused-vars
const routeNotFoundHandler = (req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  // to log routes not found messages
  logger.warn(message);

  res.status(statusCode);
  res.json({
    message,
  });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  // to log error mesagges
  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
};

export { routeNotFoundHandler, errorHandler };
