
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

export class forgetPasswordValidationDto {
    constructor() {
        this.email   =   '';
    }

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}

export class resetPasswordValidationDto {
    constructor() {
        this.email  =   '';
        this.newPassword = '';
        this.otp = '';
    }

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'New password is a required field' })
    @MinLength(6, { message: 'New password must be at least 6 characters long' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/, 
           { message: 'New password must contain at least one number, one uppercase letter, one lowercase letter, and one special character' })
    newPassword: string;

    @IsNotEmpty({ message: 'otp is a required field' })
    @IsString({ message: 'otp must be a string' })
    otp: string;
}