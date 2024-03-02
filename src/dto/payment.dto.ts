import { IsString,IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export interface initialisePaymentDTO {
    email: string;
    amount: string;
}

export interface completePaymentDTO {
    amount: Number;
    patientId: String;
    referenceId: String;
    paymentDate: String;
    PaidService: String;
}

export interface initialisePaymentResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
}

export class completePaymentValidationDto {
    constructor() {
        this.amount = 0;
        this.patientId = '';
        this.referenceId = '';
        this.paymentDate = '';
        this.PaidService = '';
    }

    @IsNotEmpty({ message: 'patientId is a required field' })
    @IsString({ message: 'patientId must be a string' })
    patientId: string;

    @IsNotEmpty({ message: 'referenceId is a required field' })
    @IsString({ message: 'referenceId must be a string' })
    referenceId: string;

    @IsNotEmpty({ message: 'payment Date is a required field' })
    @IsString({ message: 'payment Date must be a string' })
    paymentDate: string;

    @IsNotEmpty({ message: 'paid service is a required field' })
    @IsString({ message: 'paid service must be a string' })
    PaidService: string;

    @IsNotEmpty({ message: 'price is a required field' })
    @IsNumber({}, { message: 'price must be a number' })
    amount: Number;

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