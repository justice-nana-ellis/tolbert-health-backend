"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const patient_controller_1 = require("./patient.controller");
const practitioner_controller_1 = require("./practitioner.controller");
exports.controllers = [
    new patient_controller_1.PatientController(),
    new practitioner_controller_1.PractitionerController(),
    // initialize other controllers
];
