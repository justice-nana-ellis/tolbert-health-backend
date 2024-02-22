import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface hospitalDTO {
    id?: string;
    name: string;
}

export interface hospitalResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
}

export class hospitalValidationDto {
    constructor() {
        this.id = '';
        this.name = '';
    }

    //@IsUUID('4')
    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'name is a required field' })
    @IsString({ message: 'name must be a string' })
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    name: string;
}