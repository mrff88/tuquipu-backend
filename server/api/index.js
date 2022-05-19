import express from 'express';
import usersRoutes from './users/routes.js';
import clientsRoutes from './clients/routes.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/clients', clientsRoutes);

export default router;
