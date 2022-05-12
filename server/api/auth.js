import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { secret } = config.token;
const { sign } = jwt;

const signToken = (payload) => sign(payload, secret);

export default { signToken };
