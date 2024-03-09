
import { PaymentRepository } from "../repositories";
import { completePaymentDTO, completePaymentResponseDTO, initialisePaymentDTO, initialisePaymentResponseDTO  } from '../dto'; 

export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor () {
        this.paymentRepository = new PaymentRepository ();
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
    }

    async verify (referenceId: string) {
        try {
            if(referenceId === '' || referenceId === undefined) return <initialisePaymentResponseDTO>{ 
                status: 'error',
                content: {
                    "message": "Reference is required"
                }
            };
            const verified:any = await this.paymentRepository.verify(referenceId);            
            //console.log(verified._body.data.status);
            if (verified?._body?.data?.status === 'success') {
                return <initialisePaymentResponseDTO> { 
                    status: 'success',
                    content: verified
                };                   
            } else if (verified?._body?.data?.status === 'failed' ) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: {
                        "message": "Transaction verification failed"
                    }
                }; 
            } else if (verified?._body?.data?.status === 'abandoned') {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: {
                        "message": "Transaction abandoned - please proceed with payment"
                    }
                }; 
            }
        } catch (error: any) {      
            if (error) {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Transaction verification failed' } 
                };
            } 
        }
    }

    async get (skip: number, take: number) {
        try {
            const payment = await this.paymentRepository.get(skip, take);
            // const records = await this.paymentRepository.allRecords();
            
            // let totalAmount: number = 0;
            // records.forEach(amount => {
            //     totalAmount += +amount.amount;
            // });
            const total = await this.paymentRepository.count (); 
            return <initialisePaymentResponseDTO> { 
                status: 'success',
                total: total,
                content: payment
            }; 
        } catch (error) {
            if (error) {
                return {
                    status: "error",
                    content: {
                        "message": "Internal server error"
                    }
                }
            }
        }
    }

    async create (data: any) {
        try {
            const payment = await this.paymentRepository.create(data);
            return <initialisePaymentResponseDTO> { 
                status: 'success',
                content: payment
            }; 
        } catch (error) {
            if (error) {
                return {
                    status: "error",
                    content: {
                        "message": "Internal server error"
                    }
                }
            }
        }
    }

    async complete (paymentData: completePaymentDTO) {
        try {
            //console.log(paymentData);
            const verified : any = await this.paymentRepository.verify (paymentData.referenceId); 
            //@ts-ignore
            //console.log(verified._body.data.status);
            //@ts-ignore
            if (verified?._body?.data?.status === 'success') {
                const patientExists = await this.paymentRepository.patientExists(paymentData.patientId);
                if (patientExists === null)  return <completePaymentResponseDTO> {  
                    status: 'success',
                    content: { message: 'Patient not found' } 
                };

                //@ts-ignore
                const serviceExists = await this.paymentRepository.serviceExists(paymentData.serviceId);
                if (serviceExists === null)  return <completePaymentResponseDTO> {  
                    status: 'success',
                    content: { message: 'Service not found' } 
                };
                //console.log(patientExists, serviceExists);
                await this.paymentRepository.create (paymentData)
                //console.log('PAID', lof);
                return <completePaymentResponseDTO> {  
                    status: 'success',
                    content: { message: 'Payment completed successfully' } 
                };
            } else if (verified?._body?.data?.status === 'failed') {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: {
                        "message": "Payment failed"
                    }
                }; 
            } else if (verified?._body?.data?.status === 'abandoned') {
                return <initialisePaymentResponseDTO>{ 
                    status: 'error',
                    content: {
                        "message": "Transaction abandoned - please proceed with payment"
                    }
                }; 
            }
        } catch (error: any) {
            if (error) {
                return <completePaymentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Transaction failed' } 
                };
            }
        }
    }

}