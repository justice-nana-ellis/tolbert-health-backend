
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { AdminRepository, GenericRepository, PatientRepository, PractitionerRepository, PaymentRepository } from "../repositories";
import { signupAdminDTO, signinAdminResponseDTO, logoutAdminResponseDTO,
         signupAdminResponseDTO, adminDTO, signinAdminDTO, otpDTO  } from '../dto'; 
import { sendEmail, verifyEmailTemplate, courierMessage, errorHandler } from '../util';

export class AdminService {
    private practitionerRepository: PractitionerRepository = new PractitionerRepository;
    private patientRepository: PatientRepository = new PatientRepository;
    private genericRepository: GenericRepository = new GenericRepository;
    private paymentRepository: PaymentRepository = new PaymentRepository;
    private adminRepository: AdminRepository = new AdminRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async signup(adminData: signupAdminDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(adminData.password, salt);
            const admin = {
                ...adminData,
                password: hash,
            }
            const response: any = await this.adminRepository.signup(admin);    
            //delete response.password;
            const otp = randomstring.generate({ length: 4, charset: 'numeric' });
            const otpData: otpDTO = {
                otp_code: otp,
                user_id: response.id,
                email: response.email
            } 
            const otpGone = await this.genericRepository.sendOTP(otpData);
            if(otpGone) {
                sendEmail(verifyEmailTemplate(otp), response.email, `Email Verification`);
                return <signupAdminResponseDTO>{ 
                    status: 'success',
                    content:  {
                        "message": "OTP sent to your E-Mail - Enter to activate your account",
                    }
                };
            }
            return <signupAdminResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupAdminResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupAdminResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async signin(patientData: signinAdminDTO) {
        try {
            const response: any = await this.adminRepository.signin(patientData); 
            if(response === null) { 
                return <signinAdminResponseDTO> {
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            } else if (response.active === false) {
                return <signinAdminResponseDTO> {
                    status: "error",
                    code: 181,
                    content: {
                        "message": "Email verification required"
                    }
                };
            } else if (response.deleted === true) {
                return <signinAdminResponseDTO> {
                    status: "error",
                    code: 601,
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
                    "id": `${response?.id}`,
                    "email": `${response?.email}`,
                    "full_name": `${response?.email}`,
                    "access_level": `${response?.access_level}` 
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                delete response.password;
                return <signupAdminResponseDTO>{
                    status: "success",
                    content: response,
                    token: Token
                };
            } else {
                return <signupAdminResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            }
        } catch (error) {
            
        }
    }

    async update(patientData: signinAdminDTO, id: string) {
        try {
            const response: any = await this.adminRepository.update(patientData, id);
            delete response.password;
            return <signinAdminResponseDTO> {
                status: "success",
                content: response
            };
        } catch (error) {
            errorHandler(error);
        } 
    }

    async logout(id: string) {
        try {
            const response = await this.adminRepository.logout(id);
            if (response === null) {
                return <logoutAdminResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                }
            }
            return <logoutAdminResponseDTO> {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            }
        } catch (error: any) {
            
        }
    }

    async get(skip: number, take: number) {
        try {
            const response = await this.adminRepository.get (skip, take);
            const total = await this.adminRepository.count ();
            
            return <signinAdminResponseDTO>{
                status: "success",
                total: total,
                content: response
            };
        } catch (error: any) {
            
        }
    }

    async getbyId(id: string) {
        try {
            
            const response = await this.adminRepository.getbyId(id);  
            if (response === null) {
              let response:[] = []
              return <adminDTO>{ 
                status: 'success',
                content: response
            };
            }
            return <adminDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('admin')) {
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
              } else {
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async changeStatus(id: string, status: string) {
        try {
            const response = await this.adminRepository.changeStatus(id, status);
            //@ts-ignore
            delete response.password;
            return <signinAdminResponseDTO> {
                status: "success",
                content: {
                    message: `Status changed successfully`
                }
            };
        } catch (error: any) {
            
        }
    }

    async total () {
        try {
            const totalPending = await this.practitionerRepository.countPending();
            const totalDeleted = await this.practitionerRepository.countDeleted();
            const totalApproved = await this.practitionerRepository.countApproved();
            const totalRejected = await this.practitionerRepository.countRejected();
            const totalPractitioners = await this.practitionerRepository.count();
         
            const _totalDeleted = await this.patientRepository.countDeleted();
            const _totalPatients = await this.patientRepository.count();

            const records = await this.paymentRepository.allRecords();
            let countRecords = 0;
            let totalAmount: number = 0;
            records.forEach(amount => {
                totalAmount += +amount.amount;
                countRecords ++;
            });
            return <signinAdminResponseDTO>{
                status: "success",
                content: {
                    _patients: {
                        total: _totalPatients,
                        deleted: _totalDeleted
                        
                    },
                    _Practitioners: {
                        total: totalPractitioners,
                        pending: totalPending,
                        approved: totalApproved,
                        rejected: totalRejected,
                        deleted: totalDeleted
                    },
                    _payments: {
                        total: countRecords,
                        amount: totalAmount
                    }
                }
            };
        } catch (error) {
            
        }
        
    }

}