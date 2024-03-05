
import { IsString, MinLength, IsOptional, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface otpDTO {
    id?: string;
    user_id?: string;
    email?: string;
    otp_code: string;
}

export interface genericResponseDTO {
    status: string;
    code?: number;
    content?: any;
    timestamp?: string;
}

export class genericValidationDto {
    constructor() {
        this.email   =   '';
        this.otp     =   '';
    }

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'otp is a required field' })
    @IsString({ message: 'otp must be a string' })
    otp: string;

}