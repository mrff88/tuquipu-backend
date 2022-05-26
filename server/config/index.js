import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';
import __dirname from '../../environment.js';

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

const config = {
  server: {
    port: process.env.PORT,
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  token: {
    secret: process.env.JWT_SECRET,
  },
};

export default config;
