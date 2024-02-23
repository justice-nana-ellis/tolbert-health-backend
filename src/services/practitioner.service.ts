
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PractitionerRepository } from "../repositories";
import { signupPractitionerDTO, signupPractitionerResponseDTO, logoutPractitionerResponseDTO,
         signinPractitionerDTO, signinPractitionerResponseDTO  } from '../dto'; 

export class PractitionerService {
    private practitionerRepository: PractitionerRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

    constructor() {
        this.practitionerRepository = new PractitionerRepository();
    }

    async signup(patientData: signupPractitionerDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(patientData.password, salt);
            const patient = {
                ...patientData,
                password: hash,
                verified: false,
                status: 'pending'
            }
            const response: any = await this.practitionerRepository.signup(patient);    
            return <signupPractitionerResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupPractitionerResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupPractitionerResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async signin(patientData: signinPractitionerDTO) {
        try {
            const response: any = await this.practitionerRepository.signin(patientData); 
            if(response === null) { 
                return <signinPractitionerResponseDTO>{
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
                    "full_name": `${response.email}`
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                
                return <signinPractitionerResponseDTO>{
                    status: "success",
                    content: response,
                    token: Token
                };
            } else {
                return <signinPractitionerResponseDTO>{
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
            const response = await this.practitionerRepository.logout(id);
            if (response === null) {
                return <logoutPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                }
            }
            return <logoutPractitionerResponseDTO> {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            }
        } catch (error: any) {
            
        }
    }
}