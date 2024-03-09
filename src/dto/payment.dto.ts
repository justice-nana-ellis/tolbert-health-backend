import { IsString,IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export interface initialisePaymentDTO {
    email: string;
    amount: string;
}

export interface completePaymentDTO {
    amount: string;
    patientId: string;
    referenceId: string;
    paymentDate: string;
    service: string;
}

export interface initialisePaymentResponseDTO {
    status: string;
    content?: any;
    total?: any;
    timestamp?: string;
}

export interface completePaymentResponseDTO {
    status: string;
    content?: any;
    total?: number;
    timestamp?: string;
}

export class completePaymentValidationDto {
    constructor() {
        this.amount = '';
        this.patientId = '';
        this.referenceId = '';
        this.serviceId = '';
    }

    @IsNotEmpty({ message: 'patientId is a required field' })
    @IsString({ message: 'patientId must be a string' })
    patientId: string;

    @IsNotEmpty({ message: 'referenceId is a required field' })
    @IsString({ message: 'referenceId must be a string' })
    referenceId: string;

    @IsNotEmpty({ message: 'paid service is a required field' })
    @IsString({ message: 'paid service must be a string' })
    serviceId: string;

    @IsNotEmpty({ message: 'price is a required field' })
    @IsString({ message: 'paid service must be a string' })
    amount: string;

}

export class initialisePaymentValidationDto {
    constructor() {
        this.email = '';
        this.amount = '';
    }

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'amount is a required field' })
    @IsString({ message: 'amount must be a number' })
    amount: string;
}