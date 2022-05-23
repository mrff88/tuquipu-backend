import 'dotenv/config';

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
