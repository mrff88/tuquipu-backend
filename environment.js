/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path from 'path';

// config environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;
