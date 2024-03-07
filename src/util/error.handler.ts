import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { initialisePaymentResponseDTO } from "../dto";

export const errorHandler = (error: any) => {
    if (error instanceof PrismaClientInitializationError || error.errorCode === 'P1001' || 'P1003') {
        return <initialisePaymentResponseDTO> { 
            status: 'error',
            content: { message: 'Please try again' } 
        };
    } else {
        return <initialisePaymentResponseDTO> { 
            status: 'error',
            content: { message: 'Internal server error' } 
        };
    } 
}