
import { PatientRepository } from "../repositories/patientRepository";
import { RegisterPatientDTO } from '../dto/patient.dto'; 

const timestamp = new Date().toISOString();

export class PatientService {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async signup(patientData: RegisterPatientDTO) {
        // business logic
        return this.patientRepository.signup(patientData);
    }
}