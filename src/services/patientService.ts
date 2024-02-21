
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { PatientRepository } from "../repositories/patientRepository";
import { signupPatientDTO, signinPatientDTO, signinPatientResponseDTO,
         logoutPatientResponseDTO  } from '../dto/patient.dto'; 

export class PatientService {
    private patientRepository: PatientRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async signup(patientData: signupPatientDTO) {
        return this.patientRepository.signup(patientData);  
    }

    async signin(patientData: signinPatientDTO) {
        try {
            const response: any = await this.patientRepository.signin(patientData); 
            if(response === null) { 
                return <signinPatientResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            }
           
            const match = await bcrypt.compare(patientData.password, response.password)
            if(match) {
                //-- jwt
                const payload = {
                    "iss": `TOLBERT_HEALTH_SERVICE`,
                    ...response,
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                
                return <signinPatientResponseDTO>{
                    status: "success",
                    content: response,
                    token: Token
                };
            } else {
                return <signinPatientResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            }
        } catch (error) {
            
        }
    }

    async logout() {
         return <logoutPatientResponseDTO> {
            status: "success",
            content: {
                "message": "logged out successfully"
            }
         }
    }
}