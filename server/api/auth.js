import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { secret } = config.token;
const { sign, verify } = jwt;

const signToken = (payload) => sign(payload, secret);

/**
 * Validate if token is correct
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateToken = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  if (token) {
    verify(token, secret, (err, authData) => {
      if (!err) {
        req.authData = authData;
        next();
      } else {
        const message = 'Unauthorized';
        next({
          success: false,
          message,
          statusCode: 401,
          level: 'info',
        });
      }
    });
  } else {
    const message = 'Unauthorized';
    next({
      success: false,
      message,
      statusCode: 401,
      level: 'info',
    });
  }
};

export default { signToken, validateToken };
