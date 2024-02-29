
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { GenericRepository, PractitionerRepository } from "../repositories";
import { signupPractitionerDTO, signupPractitionerResponseDTO, logoutPractitionerResponseDTO,
         signinPractitionerDTO, signinPractitionerResponseDTO,otpDTO  } from '../dto'; 
import { sendEmail, verifyEmailTemplate } from '../util';

export class PractitionerService {
    private practitionerRepository: PractitionerRepository;
    private genericRepository: GenericRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY
    

    constructor() {
        this.practitionerRepository = new PractitionerRepository();
        this.genericRepository = new GenericRepository();
    }

    async signup(practitionerData: signupPractitionerDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(practitionerData.password, salt);
            const practitioner = {
                ...practitionerData,
                password: hash,
                verified: false,
                status: 'pending'
            }
           
            const hospitalExists = await this.practitionerRepository.hospitalExists(practitionerData.hospital);
            const specialisationExists = await this.practitionerRepository.specialisationExists(practitionerData.specialisation);
    
            if (hospitalExists === null) {
                return <signupPractitionerResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Hospital not found' }
                };
            }
            if (specialisationExists === null) {
                return <signupPractitionerResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Specialistion not found' }
                };
            }
            const response: any = await this.practitionerRepository.signup(practitioner);    
            const otp = randomstring.generate({ length: 4, charset: 'numeric' });
            const otpData: otpDTO = {
                otp_code: otp,
                user_id: response.id,
                email: response.email
            } 
            const otpGone = await this.genericRepository.sendOTP(otpData);
            if(otpGone) {
                sendEmail(verifyEmailTemplate(otp), response.email, `Email Verification`);
                return <signupPractitionerResponseDTO>{ 
                    status: 'success',
                    content:  {
                        "message": "OTP sent to your E-Mail - Enter to activate your account",
                    }
                };
            }
            
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
                    "id": `${response?.id}`,
                    "email": `${response?.email}`,
                    "full_name": `${response?.email}`,
                    "access_level": `${response?.access_level}`,
                    "active": `${response?.active}` 
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                delete response.password;
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

    async getAll(skip: number, take: number) {
        try {
            const response = await this.practitionerRepository.getallPractitioners(skip, take);
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <signinPractitionerResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }

    async search(name: string, limit: number) {
        try {
            
            const response = await this.practitionerRepository.searchPractitioner(name, limit);
            return <signinPractitionerResponseDTO>{
                status: "success",
                content: response
            };

        } catch (error: any) {
            
        }
    }
}