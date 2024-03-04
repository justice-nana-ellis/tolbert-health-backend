
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { PatientRepository, GenericRepository } from "../repositories";
import { signupPatientDTO, signinPatientDTO, signinPatientResponseDTO,
         logoutPatientResponseDTO, signupPatientResponseDTO, otpDTO, getAllPatientResponseDTO  } from '../dto'; 
import { sendEmail, verifyEmailTemplate } from '../util';

export class PatientService {
    private patientRepository: PatientRepository;
    private genericRepository: GenericRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY;

    constructor() {
        this.patientRepository = new PatientRepository();
        this.genericRepository = new GenericRepository();
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
            const otp = randomstring.generate({ length: 4, charset: 'numeric' });
            const otpData: otpDTO = {
                otp_code: otp,
                user_id: response.id,
                email: response.email
            } 
            const otpGone = await this.genericRepository.sendOTP(otpData);
            if(otpGone) {
                sendEmail(verifyEmailTemplate(otp), response.email, `Email Verification`);
                return <signupPatientResponseDTO>{ 
                    status: 'success',
                    content:  {
                        "message": "OTP sent to your E-Mail - Enter to activate your account",
                    }
                };
            }
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
            console.log(response);
            
            if(response === null) { 
                return <signinPatientResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            } else if (response.deleted === true) {
                return <signinPatientResponseDTO>{
                    status: "error",
                    content: {
                        "message": "Account deactivated - contact support"
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
            const total = await this.patientRepository.count();
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <getAllPatientResponseDTO>{
                status: "success",
                total: total,
                content: response
            };
        } catch (error: any) {
            return error ? <signupPatientResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
            } : 0
        }
    }

    async search(name: string, limit: number) {
        try {
            
            const response = await this.patientRepository.searchPatient(name, limit);
            return <signinPatientResponseDTO>{
                status: "success",
                content: response
            };

        } catch (error: any) {
            
        }
    }

    async count() {
        try {
            const response = await this.patientRepository.count();
            return <signinPatientResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }

    async getbyId(id: string) {
        try {
            const response = await this.patientRepository.getbyId(id);
            //@ts-ignore
            delete response?.password;
            return <signinPatientResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }
    
}