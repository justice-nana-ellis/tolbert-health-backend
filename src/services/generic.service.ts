import { GenericRepository } from "../repositories";
import { completePaymentDTO, completePaymentResponseDTO, initialisePaymentDTO, initialisePaymentResponseDTO  } from '../dto'; 

export class GenericService {
    private genericRepository: GenericRepository 

    constructor () {
        this.genericRepository = new GenericRepository;
    }

    async verify (email: string, otp: string) {
        try {
            const response = await this.genericRepository.verifyOtpEmail(email);  
            console.log(response);
            //@ts-ignore
            if(response.otp_code === otp) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'success',
                    content: response
                }; 
            }
              
        } catch (error: any) {
            if (error) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Internal server error' } 
                };
            } 
        }
    }
}