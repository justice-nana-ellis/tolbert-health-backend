"use strict";
// import { PrismaService } from './PrismaService';
// import { createProjectInput, createProjectResponse, 
//          updateProjectInput, deleteProjectInput } from '../dto'; 
// const timestamp = new Date().toISOString();
// export class ProjectService {
//     private prismaService: PrismaService;
//     constructor() {
//       this.prismaService = new PrismaService();
//       this.create = this.create.bind(this); 
//       this.update = this.update.bind(this);
//       this.delete = this.delete.bind(this);
//     }
//     async create(createProjectInput: createProjectInput) {
//         try {
//           const content = await this.prismaService.prisma.project.create({
//             data: createProjectInput,
//           });
//           return <createProjectResponse>{
//             status: 'success',
//             content
//           }
//         } catch (error: any) {
//           if (error.code === 'P2002' && error.meta?.target?.includes('project_name')) {
//             return <createProjectResponse>{ 
//               status: 'error',
//               content: { message: 'Project name already Taken' }
//             };
//           } else {
//             return <createProjectResponse>{ 
//               status: 'error',
//               content: { message: 'Internal server error' } 
//             };
//           }
//         } 
//     }
//     async update(updateProjectInput: updateProjectInput, id: string) {
//       try {
//         const content = await this.prismaService.prisma.project.update({
//           where: { 
//             id: id
//           },
//           data: updateProjectInput,
//         });
//         return <createProjectResponse>{
//           status: 'success',
//           content
//         }
//       } catch (error: any) {
//         if (error.code === 'P2002' && error.meta?.target?.includes('project_name')) {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Project name already Taken' },
//             timestamp: timestamp, 
//           };
//         } else if(error.code === 'P2025' && error.meta.cause=='Record to update not found.'){
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'record not found' },
//             timestamp: timestamp 
//           };
//         } else {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Internal server error' },
//             timestamp: timestamp 
//           };
//         }
//       } 
//     }
//     async delete(id: string) {
//       try {
//         await this.prismaService.prisma.project.delete({
//           where: { 
//             id: id
//           }
//         });
//         return <createProjectResponse>{
//           status: 'success',
//           content: { message: 'Project deleted successfully' }
//         }
//       } catch (error: any) {
//         if (error.code === 'P2002' && error.meta?.target?.includes('project_name')) {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Project name already Taken' },
//             timestamp: timestamp
//           };
//         } else if (error.code === 'P2025'){
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Record not found'},
//             timestamp: timestamp
//           };
//         } else {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Internal server error'},
//             timestamp: timestamp
//           };
//         } 
//      }
//     } 
//     async getProjects() {
//       try {
//         const content = await this.prismaService.prisma.project.findMany();
//         return <createProjectResponse>{
//           status: 'success',
//           content
//         }
//       } catch (error: any) {
//         if (error.code === 'P2002' && error.meta?.target?.includes('project_name')) {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Project name already Taken'},
//             timestamp: timestamp 
//           };
//         } else if (error.code === 'P2025'){
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Record not found' },
//             timestamp: timestamp 
//           };
//         } else {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Internal server error'},
//             timestamp: timestamp  
//           };
//         }
//       } 
//     }
//     async getProjectByID(id: string) {
//       try {
//         const content = await this.prismaService.prisma.project.findUnique({
//           where: { 
//             id: id
//           }
//         });
//         if(content === null) {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: 'Record not found' };
//         }
//         return <createProjectResponse>{
//           status: 'success',
//           content: content
//         }
//       } catch (error: any) {
//         if (error.code === 'P2002' && error.meta?.target?.includes('project_name')) {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Project name already Taken'},
//             timestamp: timestamp 
//           };
//         } else if (error.code === 'P2025'){
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Record not found' },
//             timestamp: timestamp 
//           };
//         } else {
//           return <createProjectResponse>{ 
//             status: 'error',
//             content: { message: 'Internal server error'},
//             timestamp: timestamp  
//           };
//         }
//     }
//     }
// }
