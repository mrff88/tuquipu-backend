import http from 'http';
import app from './server/index.js';
import config from './server/config/index.js';
import database from './server/database.js';

// connect to database
database.connect(config.database, {});

const { port } = config.server;

const server = http.createServer(app);

server.listen(port || 5000, () => {
  console.log(`Server started at port ${port}`);
});
