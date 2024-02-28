
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PatientRepository } from "../repositories";
import { signupPatientDTO, signinPatientDTO, signinPatientResponseDTO,
         logoutPatientResponseDTO, signupPatientResponseDTO  } from '../dto'; 

export class PatientService {
    private patientRepository: PatientRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async signup(patientData: signupPatientDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(patientData.password, salt);
            const patient = {
                ...patientData,
                password: hash,
                verified: false
            }
            const response = await this.patientRepository.signup(patient);  
            //@ts-ignore
            delete response.password
            return <signupPatientResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupPatientResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupPatientResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
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
                    "id": `${response.id}`,
                    "email": `${response.email}`,
                    "full_name": `${response.email}`,
                    "access_level": `${response?.access_level}` 
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                //@ts-ignore
                delete response.password
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

    async logout(id: string) {
        try {
            const response = await this.patientRepository.logout(id)
            if (response === null) {
                return <logoutPatientResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                }
            }
            return <logoutPatientResponseDTO> {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            }
        } catch (error: any) {
            if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
                return <logoutPatientResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
            }
        }
    }

    async getAll(skip: number, take: number) {
        try {
            const response = await this.patientRepository.getallPatients(skip, take);
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <signinPatientResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            return error ? <signupPatientResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              } : 0
        }
    }
}