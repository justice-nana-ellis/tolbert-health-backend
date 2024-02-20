export * from "./projectController";

import { PatientController } from './patientController';

export const controllers = [
    new PatientController(),
    // initialize other controllers

];