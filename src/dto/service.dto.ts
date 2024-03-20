import { IsString, MinLength, IsOptional, IsNumber, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface serviceDTO {
    id?: string;
    name: string;
    practitionerId: string;
    price?: Number;
}

export interface serviceResponseDTO {
    status: string;
    content?: any;
    total?: number;
    code?: Number;
    timestamp?: string;
    verified?: boolean;
}

export class serviceValidationDto {
    constructor() {
        this.id = '';
        this.name = '';
        this.practitionerId = '';
        this.price = 0;
    }

    //@IsUUID('4')
    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'name is a required field' })
    @IsString({ message: 'name must be a string' })
    @MinLength(3, { message: 'name must be at least 3 characters long' })
    name: string;

    @IsNotEmpty({ message: 'price is a required field' })
    @IsNumber({}, { message: 'price must be a number' })
    price: Number;

    @IsNotEmpty({ message: 'practitionerId is a required field' })
    @IsString({ message: 'practitionerId must be a string' })
    practitionerId: string;
}