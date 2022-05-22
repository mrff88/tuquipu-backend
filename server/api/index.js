import express from 'express';
import usersRoutes from './users/routes.js';
import clientsRoutes from './clients/routes.js';
import devicesRoutes from './devices/routes.js';
import servicesRoutes from './services/routes.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/clients', clientsRoutes);
router.use('/devices', devicesRoutes);
router.use('/services', servicesRoutes);

export default router;
