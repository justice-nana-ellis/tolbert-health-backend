export * from "./projectController";

import { PatientController } from './patient.controller';
import { PractitionerController } from "./practitioner.controller";

export const controllers = [
    new PatientController(),
    new PractitionerController(),
    // initialize other controllers

];