import express, { Request, Response, NextFunction, Router } from 'express';
import { createProject, updateProject, deleteProject, getProjects, getProjectByID } from '../../controllers';

const projectRoutes = Router();

projectRoutes
    .get('/', getProjects)    
    .post('/', createProject)
    .get('/:id', getProjectByID)
    .patch('/:id', updateProject)
    .delete('/:id', deleteProject);

projectRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json('⚡ Hi from the Projects')
});

export default projectRoutes;