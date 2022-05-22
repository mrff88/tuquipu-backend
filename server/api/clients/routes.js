import express from 'express';
import auth from '../auth.js';
import { all, create, id, read, update } from './controller.js';

const router = express.Router();
const { validateToken } = auth;

/**
 * /api/clients/        POST  - CREATE
 * /api/clients/        GET   - READ ALL
 * /api/clients/:client_id     GET   - READ ONE
 * /api/clients/:client_id     PUT   - UPDATE
 */

router.param('client_id', id);

router.route('/').post(validateToken, create).get(validateToken, all);

router.route('/:client_id').get(validateToken, read).put(validateToken, update);

export default router;
