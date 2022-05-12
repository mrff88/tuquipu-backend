import requestID from 'express-request-id';
import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';
import { routeNotFoundHandler, errorHandler } from './middlewares/index.js';

const app = express();

// setup middlewares
app.use(requestID());
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  })
);

app.use(logger.requests);

// server routes
// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
  res.json({ message: 'API TUQUIPU' });
});

app.use(routeNotFoundHandler);

app.use(errorHandler);

export default app;
