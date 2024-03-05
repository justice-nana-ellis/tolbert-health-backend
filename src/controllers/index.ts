
import { PractitionerController } from "./practitioner.controller";
import { HospitalController } from './hospital.controller';
import { PatientController } from './patient.controller';
import { PaymentController } from './payment.controller';
import { AdminController } from './admin.controller';
import { GenericController } from './generic.controller';
import { ServiceController } from './service.controller';
import { AppointmentController } from './appointment.controller';
import { SpecialisationController } from './specialisation.controller';

export const controllers = [
    new SpecialisationController(),
    new PractitionerController(),
    new AppointmentController(),
    new HospitalController(),
    new PatientController(),
    new ServiceController(),
    new PaymentController(),
    new GenericController(),
    new AdminController(),
    // initialize other controllers

];