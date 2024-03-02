
import { PractitionerController } from "./practitioner.controller";
import { HospitalController } from './hospital.controller';
import { PatientController } from './patient.controller';
import { PaymentController } from './payment.controller';
import { AdminController } from './admin.controller';
import { ServiceController } from './service.controller';
import { AppointmentController } from './appointment.controller';
import { SpecialisationController } from './specialisation.controller';

export const controllers = [
    new PatientController(),
    new PractitionerController(),
    new HospitalController(),
    new AdminController(),
    new ServiceController(),
    new AppointmentController(),
    new SpecialisationController(),
    new PaymentController()
    // initialize other controllers

];