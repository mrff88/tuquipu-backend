import express from 'express';
import usersRoutes from './users/routes.js';
import clientsRoutes from './clients/routes.js';
import devicesRoutes from './devices/routes.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/clients', clientsRoutes);
router.use('/devices', devicesRoutes);

export default router;
