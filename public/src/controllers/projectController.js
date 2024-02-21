"use strict";
// // import { createProjectDto, createProjectInput, createProjectResponse } from '../dto';
// import { Request, Response, NextFunction, response } from "express";
// import { getErrorMessages } from '../util'; 
// import { plainToClass } from 'class-transformer';
// import { ProjectService } from '../services/ProjectService';
// const timestamp = new Date().toISOString();
// const projectService = new ProjectService();
// export const createProject = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // const errorMessages = await getErrorMessages(plainToClass(createProjectDto, req.body));
//       // if (errorMessages.length > 0) return res.status(400).json({
//       //   status: 'error',
//       //   content: { message: errorMessages }, 
//       //   timestamp: timestamp,
//       // });
//       const project = projectService.create(req.body)
//       project.then((data) => {
//         res.status(200).send(data);
//       });
//     } catch (error: any) {
//       return res.status(500).json({
//         status: 'error',
//         content: {
//           "message": "project creation failed"
//         }
//       });
//     }
//   };
// export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const errorMessages = await getErrorMessages(plainToClass(createProjectDto, req.body));
//     // if (errorMessages.length > 0) return res.status(400).json({
//     //   status: 'error',
//     //   content: { message: errorMessages }, 
//     //   timestamp: timestamp,
//     // });
//     const project = projectService.update(req.body, req.params.id)
//     project.then((data) => {
//       res.status(200).send(data);
//     })
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 'error',
//       content: 'project update failed' 
//     });
//   }
// };
// export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
//   try { 
//     const project = projectService.delete(req.params.id);
//     project.then((data) => {
//       res.status(200).send(data);
//     })
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 'error',
//       content: 'project deletion failed' 
//     });
//   }
// };
// export const getProjects = (req: Request, res: Response, next: NextFunction) => {
//   try { 
//     const project = projectService.getProjects();
//     project.then((content) => {
//       res.status(200).send(content);
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 'error',
//       content: 'Projects fetch failed' 
//     });
//   }
// };
// export const getProjectByID = (req: Request, res: Response, next: NextFunction) => {
//   try { 
//     const project = projectService.getProjectByID(req.params.id);
//     project.then((content) => {
//       res.status(200).send(content);
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 'error',
//       content: 'Projects fetch failed' 
//     });
//   }
// };
