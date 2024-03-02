
import { PaymentRepository } from "../repositories";
import { initialisePaymentDTO, initialisePaymentResponseDTO  } from '../dto'; 

export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async initialise (email: string, amount: string) {
        try {
            const response = await this.paymentRepository.initialise(email, amount);  
            return <initialisePaymentResponseDTO>{ 
                status: 'success',
                content: response
            };   
        } catch (error: any) {
            if (error) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Internal server error' } 
                };
              } 
        
    }

    // async update(hospitalData: hospitalDTO, id: string) {
    //     try {
            
    //         const response = await this.hospitalRepository.update(hospitalData, id);  
    //         return <hospitalResponseDTO>{ 
    //             status: 'success',
    //             content: response
    //         };
            
    //     } catch (error: any) {
    //         if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
    //             return <hospitalResponseDTO>{ 
    //               status: 'error',
    //               content: { message: 'Name already Taken' }
    //             };
    //           } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
    //             return <hospitalResponseDTO>{ 
    //               status: 'error',
    //               content: { message: 'Record not found' }
    //             };
    //           } else {
    //             return <hospitalResponseDTO>{ 
    //               status: 'error',
    //               content: { message: 'Internal server error' } 
    //             };
    //           }
    //     }
        
    }

}