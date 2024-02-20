
import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty, Validate } from 'class-validator';
import { isValidPassword, isValidEmail } from '../util';

export interface signupPatientDTO {
    id?: string;
    email: string;
    full_name: string;
    password: string;
}

export interface signupPatientResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
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
    @Validate(isValidEmail, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'full_name is a required field' })
    @IsString({ message: 'full_name must be a string' })
    @MinLength(3, { message: 'full_name must be at least 3 characters long' })
    full_name: string;

    @IsNotEmpty({ message: 'password is a required field' })
    @IsString({ message: 'password must be a string' })
    @MinLength(8, { message: 'password must be at least 8 characters long' })
    @Validate(isValidPassword, { message: 'password must contain at least one uppercase letter, one lowercase letter, one digit, and a minimum length of 8 characters' })
    password: string;
}



