
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';
import { PatientRepository } from "../repositories/patientRepository";
import { signupPatientDTO, signupPatientResponseDTO  } from '../dto/patient.dto'; 

const timestamp = new Date().toISOString();

export class PatientService {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async signup(patientData: signupPatientDTO) {
        //--validation
        
        // business logic
        return this.patientRepository.signup(patientData);
    }
}