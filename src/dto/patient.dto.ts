
import { IsString, MinLength, IsOptional, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface signupPatientDTO {
    id?: string;
    email: string;
    full_name: string;
    password: string;
    verified?: boolean;
}

export interface signupPatientResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
}

export interface signinPatientResponseDTO {
    status:     string;
    code?:      number;
    content?:   any;
    timestamp?: string;
    verified?:  boolean;
    token?:     string;
}

export interface signinPatientDTO {
    otp?: string;
    email: string;
    password: string;
}

export interface logoutPatientResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
    token?: string;
}

export interface getAllPatientResponseDTO {
    status: string;
    total?: number;
    content?: any;
    timestamp?: string;
    verified?: boolean;
    token?: string;
}

export class signupPatientValidationDto {
    constructor() {
        this.id = '';
        this.email = '';
        this.full_name = '';
        this.password = '';
    }

    //@IsUUID('4')
    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'full_name is a required field' })
    @IsString({ message: 'full_name must be a string' })
    @MinLength(3, { message: 'full_name must be at least 3 characters long' })
    full_name: string;

    @IsNotEmpty({ message: 'password is a required field' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/, 
           { message: 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character' })
    password: string;
}

export class updatePatientValidationDto {
    constructor() {
        this.id = '';
        this.email = '';
        this.full_name = '';
    }

    //@IsUUID('4')
    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'full_name is a required field' })
    @IsString({ message: 'full_name must be a string' })
    @MinLength(3, { message: 'full_name must be at least 3 characters long' })
    full_name: string;

}

export class signinPatientValidationDto {
    constructor() {
        this.email = '';
        this.password = '';
    }

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'password is a required field' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/, 
           { message: 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character' })
    password: string;
}





