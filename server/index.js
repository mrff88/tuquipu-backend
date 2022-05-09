import express from 'express';
import morgan from 'morgan';
import logger from './config/logger.js';
import { routeNotFoundHandler, errorHandler } from './middlewares/index.js';

const app = express();

app.use(
  morgan('combined', { stream: { write: (message) => logger.info(message) } })
);

// server routes
// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
  res.json({ message: 'API TUQUIPU' });
});

// server middlewares

app.use(routeNotFoundHandler);

app.use(errorHandler);

export default app;
