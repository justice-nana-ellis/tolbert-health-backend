
import { PractitionerController } from "./practitioner.controller";
import { HospitalController } from './hospital.controller';
import { PatientController } from './patient.controller';
import { AdminController } from './admin.controller';
import { AppointmentController } from './appointment.controller';
import { SpecialisationController } from './specialisation.controller';

export const controllers = [
    new PatientController(),
    new PractitionerController(),
    new HospitalController(),
    new AdminController(),
    new AppointmentController(),
    new SpecialisationController()
    // initialize other controllers

];