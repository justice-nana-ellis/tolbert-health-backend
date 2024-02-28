"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const practitioner_controller_1 = require("./practitioner.controller");
const hospital_controller_1 = require("./hospital.controller");
const patient_controller_1 = require("./patient.controller");
const admin_controller_1 = require("./admin.controller");
const service_controller_1 = require("./service.controller");
const appointment_controller_1 = require("./appointment.controller");
const specialisation_controller_1 = require("./specialisation.controller");
exports.controllers = [
    new patient_controller_1.PatientController(),
    new practitioner_controller_1.PractitionerController(),
    new hospital_controller_1.HospitalController(),
    new admin_controller_1.AdminController(),
    new service_controller_1.ServiceController(),
    new appointment_controller_1.AppointmentController(),
    new specialisation_controller_1.SpecialisationController()
    // initialize other controllers
];
