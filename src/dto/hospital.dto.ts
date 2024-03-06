import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface hospitalDTO {
    id?: string;
    name: string;
    city?: string;
    zip?: string;
    street?: string;
    country?: string;
}

export interface hospitalResponseDTO {
    status: string;
    content?: any;
    total?: number;
    timestamp?: string;
    verified?: boolean;
}

export class hospitalValidationDto {
    constructor() {
        this.id = '';
        this.name = '';
        this.city = '';
        this.zip = '';
        this.street = '';
        this.country = '';
    }

    //@IsUUID('4')
    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'name is a required field' })
    @IsString({ message: 'name must be a string' })
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    name: string;

    @IsNotEmpty({ message: 'city is a required field' })
    @IsString({ message: 'city must be a string' })
    @MinLength(3, { message: 'city must be at least 3 characters long' })
    city: string;

    @IsNotEmpty({ message: 'zip is a required field' })
    @IsString({ message: 'zip must be a string' })
    @MinLength(3, { message: 'zip must be at least 3 characters long' })
    zip: string;

    @IsNotEmpty({ message: 'strret is a required field' })
    @IsString({ message: 'street must be a string' })
    @MinLength(3, { message: 'street must be at least 3 characters long' })
    street: string;

    @IsNotEmpty({ message: 'country is a required field' })
    @IsString({ message: 'country must be a string' })
    @MinLength(5, { message: 'country must be at least 5 characters long' })
    country: string;
}