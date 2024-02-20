import projectRoutes from './api/project.ts';
import adminRoutes from './api/admin.ts';
import { Router } from 'express';

const routes = Router();

routes.use('/projects', projectRoutes);
routes.use('/admin', adminRoutes);

export default routes;