import randomstring from 'randomstring';
import { GenericRepository, PatientRepository, PractitionerRepository, AdminRepository } from "../repositories";
import { sendEmail, verifyEmailTemplate } from '../util';
import { genericResponseDTO, otpDTO, initialisePaymentDTO, initialisePaymentResponseDTO  } from '../dto'; 

export class GenericService {
    private adminRepository: AdminRepository
    private genericRepository: GenericRepository;
    private patientRepository: PatientRepository;
    private practitionerRepository: PractitionerRepository;

    constructor () {
        this.adminRepository = new AdminRepository();
        this.genericRepository = new GenericRepository();
        this.patientRepository = new PatientRepository();
        this.practitionerRepository = new PractitionerRepository();
    }

    async verify (email: string, otp: string) {
        try {
            const response = await this.genericRepository.verifyOtpEmail(email);  
            //@ts-ignore
            const updatedAt = new Date(response?.updatedAt);
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            if (updatedAt < tenDaysAgo) {
                const otp = <string>randomstring.generate({ length: 4, charset: 'numeric' });
                //@ts-ignore
                const otpGone = await this.genericRepository.update(response?.email, otp);
                if(otpGone) {
                    //@ts-ignore
                    sendEmail(verifyEmailTemplate(otp), response?.email, `Email Verification`);
                    return <genericResponseDTO>{ 
                        status: 'error',
                        code: 473,
                        content: {
                            "message": "OTP expired - New OTP sent to E-mail"
                        }
                    };
                }
            }
            //@ts-ignore
            if(response.otp_code === otp) {
                //@ts-ignore
                await this.adminRepository.updateVerification(response?.email);
                //@ts-ignore
                await this.patientRepository.updateVerification(response?.email);
                //@ts-ignore
                await this.practitionerRepository.updateVerification(response?.email);
                return <genericResponseDTO>{ 
                    status: 'success',
                    code: 471,
                    content: {
                        "message": "Email verified successful"
                    }
                }; 
            //@ts-ignore
            } else if (response.otp_code !== otp){
                return <genericResponseDTO>{ 
                    status: 'error',
                    code: 499,
                    content: {
                        "message": "Invalid OTP"
                    }
                }; 
            }
        } catch (error: any) {
            console.log(error);
            
            if (error) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Internal server error' } 
                };
            } 
        }
    }
}