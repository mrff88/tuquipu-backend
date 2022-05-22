import express from 'express';
import auth from '../auth.js';
import { id as deviceId } from '../devices/controller.js';
import { all, create, id, read, update } from './controller.js';

const router = express.Router();
const { validateToken } = auth;

/**
 * /api/services/:device_id                      POST  - CREATE
 * /api/services/:device_id                      GET   - READ ALL
 * /api/services/service/:service_id               GET   - READ ONE
 * /api/services/service/:service_id               PUT   - UPDATE
 */

router.param('device_id', deviceId);
router.param('service_id', id);

router.route('/:device_id').post(validateToken, create).get(validateToken, all);

router
  .route('/service/:service_id')
  .get(validateToken, read)
  .put(validateToken, update);

export default router;
