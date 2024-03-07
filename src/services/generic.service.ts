import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GenericRepository, PatientRepository, PractitionerRepository, AdminRepository } from "../repositories";
import { sendEmail, verifyEmailTemplate, passwordResetTemplete } from '../util';
import { genericResponseDTO } from '../dto'; 
import { errorHandler } from '../util';


export class GenericService {
    private adminRepository: AdminRepository
    private genericRepository: GenericRepository;
    private patientRepository: PatientRepository;
    private practitionerRepository: PractitionerRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

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
                return <genericResponseDTO> { 
                    status: 'success',
                    code: 471,
                    content: {
                        "message": "Email verified successful"
                    }
                }; 
            //@ts-ignore
            } else if (response.otp_code !== otp) {
                return <genericResponseDTO>{ 
                    status: 'error',
                    code: 499,
                    content: {
                        "message": "Invalid OTP"
                    }
                }; 
            }
        } catch (error: any) {
            return error ? errorHandler(error) : 0
        }
    }

    async forgetPassword (email: string) {
        try {
            const otp = <string>randomstring.generate({ length: 4, charset: 'numeric' });
            //@ts-ignore
            const otpGone = await this.genericRepository.upsert(email, otp);
            if (otpGone) {
                //@ts-ignore
                sendEmail(passwordResetTemplete(otp), email, `Password Reset`);
                return <genericResponseDTO> { 
                    status: 'success',
                    code: 906,
                    content: {
                        "message": "OTP sent to E-mail"
                    }
                };
            }
        } catch (error) {
            return error ? errorHandler(error) : 0 
        }
    }

    async resetPassword (email: string, otp: string, password: string) {
        try {
            // const otp = <string>randomstring.generate({ length: 4, charset: 'numeric' });
            // //@ts-ignore
            // const otpGone = await this.genericRepository.upsert(email, otp);
            // if (otpGone) {
            //     //@ts-ignore
            //     sendEmail(passwordResetTemplete(otp), email, `Password Reset`);
            // }
            const verified = await this.verify(email, otp);
            //@ts-ignore
            if (verified?.status === 'success') {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                await this.genericRepository.updatePractitionerPassword(email, hash);
                await this.genericRepository.updatePatientPassword(email, hash);
                await this.genericRepository.updateAdminPassword(email, hash);
            
                return <genericResponseDTO> { 
                    status: 'success',
                    code: 688,
                    content: {
                        "message": "Password reset successfully"
                    }
                };
            }
        } catch (error) {
            return error ? errorHandler(error) : 0 
        }
    }

}