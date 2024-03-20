import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { initialisePaymentResponseDTO, serviceResponseDTO } from "../dto";

export const errorHandler = (error: any) => {
    if (error instanceof PrismaClientInitializationError || error.errorCode === 'P1001' || 'P1003') {
        return <initialisePaymentResponseDTO> { 
            status: 'error',
            content: { message: 'Please try again' } 
        };
    } else if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        return <serviceResponseDTO> { 
          status: 'error',
          content: { message: 'Name already taken' }
        };
    } else {
        return <initialisePaymentResponseDTO> { 
            status: 'error',
            content: { message: 'Internal server error' } 
        };
    } 
}