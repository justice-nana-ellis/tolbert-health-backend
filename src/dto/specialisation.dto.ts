import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface specialisationDTO {
    id?: string;
    name: string;
}

export interface specialisationResponseDTO {
    status: string;
    content?: any;
    total?: number;
    timestamp?: string;
    verified?: boolean;
}

export class specialisationValidationDto {
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