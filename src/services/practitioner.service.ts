
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { GenericRepository, PractitionerRepository, PatientRepository } from "../repositories";
import { signupPractitionerDTO, signupPractitionerResponseDTO, logoutPractitionerResponseDTO,
         signinPractitionerDTO, signinPractitionerResponseDTO,otpDTO, getAllPractitionerResponseDTO  } from '../dto'; 
import { errorHandler, sendEmail, verifyEmailTemplate } from '../util';

export class PractitionerService {
    private practitionerRepository: PractitionerRepository;
    private patientRepository: PatientRepository;
    private genericRepository: GenericRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY
    

    constructor() {
        this.practitionerRepository = new PractitionerRepository();
        this.genericRepository = new GenericRepository();
        this.patientRepository = new PatientRepository();
    }

    async signup(practitionerData: signupPractitionerDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(practitionerData.password, salt);
            const practitioner = {
                ...practitionerData,
                dob: practitionerData.dob.split('T')[0],
                password: hash,
                verified: false,
                status: 'pending'
            }
            const hospitalExists = await this.practitionerRepository.hospitalExists(practitionerData.hospitalId);
            const specialisationExists = await this.practitionerRepository.specialisationExists(practitionerData.specialisationId);
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
            await this.practitionerRepository.association(response)
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
            console.log(error);
            
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

    async update(practitionerData: signupPractitionerDTO, id: string) {
        try {
            const practitionerExist = await this.practitionerRepository.getbyId (id);
            if (practitionerExist === null) {
                return <signinPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                } 
            }
            const response = await this.practitionerRepository.update({ ...practitionerData, dob: practitionerData.dob.split('T')[0],}, id);
            //@ts-ignore
            delete response?.password
            return <signupPractitionerResponseDTO> {
                status: "success",
                content: response
            };
        } catch (error) {
            if (error) {
                return <signupPractitionerResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Internal server error' } 
                }
            }
        }
    }

    async signin(practitionerData: signinPractitionerDTO) {
        try {
            const response: any = await this.practitionerRepository.signin(practitionerData); 
            console.log(response);
            
            if(response === null) { 
                return <signinPractitionerResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            } else if (response?.active === false) {
                return <signinPractitionerResponseDTO>{
                    status: "error",
                    code: 181,
                    content: {
                        "message": "Email verification required"
                    }
                };
            } else if (response?.deleted === true) {
                return <signinPractitionerResponseDTO> {
                    status: "error",
                    code: 601,
                    content: {
                        "message": "Account deactivated - contact support"
                    }
                };
            }
            const match = await bcrypt.compare(practitionerData.password, response.password)
            if(match) {
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
            const total = await this.practitionerRepository.count();
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <getAllPractitionerResponseDTO>{
                status: "success",
                total: total,
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

    async top5 () {
        try {
            const response = await this.practitionerRepository.top5 ();
            return <signinPractitionerResponseDTO> {
                status: "success",
                content: response
            };
        } catch (error: any) {
              errorHandler(error);
        }
    }

    async pending(skip: number, take: number) {
        try {
            const response = await this.practitionerRepository.pending(skip, take);
            const total = await this.practitionerRepository.countPending();
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <getAllPractitionerResponseDTO>{
                status: "success",
                total: total,
                content: response
            };
        } catch (error: any) {
           if (error) {
                return <logoutPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Internal server error"
                    }
                }
            }
        } 
        
    }

    async count() {
        try {
            const response = await this.practitionerRepository.count();
            return <signinPractitionerResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }

    async getbyId(id: string) {
        try {
            console.log(id);
            
            const response = await this.practitionerRepository.getbyId(id);
            console.log(response);
            
            //@ts-ignore
            delete response?.password
            return <signinPractitionerResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            console.log(error);
            
        }
    }

    async delete(id: string) {
        try {
            const practitionerExist = await this.practitionerRepository.getbyId (id);
            if (practitionerExist === null) {
                return <signinPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Practitioner not found"
                    }
                } 
            } else {
                await this.practitionerRepository.delete (id) ;
                return <signinPractitionerResponseDTO> {
                    status: "success",
                    content: {
                        "message": "Practitioner deleted successfully"
                    }
                };
            };
        } catch (error: any) {
            if (error) {
                return <logoutPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Internal server error"
                    }
                }
            }
        }
    }

    async appointment(id: string, status: string[], skip: number, take: number) {
        try {
            const response = await this.practitionerRepository.getPractitionerAppointment(id, status, skip, take);
            return {
                status: "success",
                content: response
            };
        } catch (error: any) {
            if (error) {
                return <logoutPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Internal server error"
                    }
                }
            }
        }
    }
}