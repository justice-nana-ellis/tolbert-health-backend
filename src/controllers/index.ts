
import { PractitionerController } from "./practitioner.controller";
import { HospitalController } from './hospital.controller';
import { PatientController } from './patient.controller';

export const controllers = [
    new PatientController(),
    new PractitionerController(),
    new HospitalController()
    // initialize other controllers

];