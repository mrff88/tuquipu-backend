import mongoose from 'mongoose';
import logger from './config/logger.js';

const connect = (
  { protocol = 'mongodb', url, username = '', password = '' },
  options = {}
) => {
  let dburl = '';

  // Require auth
  if (username && password) {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Database connection error: ${err}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination');
      process.exit(0);
    });
  });
};

const disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected');
  });
};

export default { connect, disconnect };
