import express from 'express';
import auth from '../auth.js';
import { id as cliendId } from '../clients/controller.js';
import { all, create, id, read, update } from './controller.js';

const router = express.Router();
const { validateToken } = auth;

/**
 * /api/devices/:client_id                      POST  - CREATE
 * /api/devices/:client_id                      GET   - READ ALL
 * /api/devices/device/:device_id               GET   - READ ONE
 * /api/devices/device/:device_id               PUT   - UPDATE
 */

router.param('client_id', cliendId);
router.param('device_id', id);

router.route('/:client_id').post(validateToken, create).get(validateToken, all);

router
  .route('/device/:device_id')
  .get(validateToken, read)
  .put(validateToken, update);

export default router;
