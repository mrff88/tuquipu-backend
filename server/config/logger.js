import { createLogger, format, transports } from 'winston';

// Setup logger
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

export default logger;
