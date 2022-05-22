import express from 'express';
import { adminOnly } from '../../middlewares/index.js';
import auth from '../auth.js';
import { id, read, login, create, all, update } from './controller.js';

const router = express.Router();
const { validateToken } = auth;

/**
 * /api/users/auth    POST  - LOGIN
 * /api/users/        POST  - CREATE
 * /api/users/        GET   - READ ALL
 * /api/users/:user_id     GET   - READ ONE
 * /api/users/:user_id     PUT   - UPDATE
 */

router.param('user_id', id);

router.route('/auth').post(login);

router.route('/').post(create).get(validateToken, adminOnly, all);

router
  .route('/:user_id')
  .get(validateToken, adminOnly, read)
  .put(validateToken, adminOnly, update);

export default router;
