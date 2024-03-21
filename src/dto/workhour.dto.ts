import { days } from '@prisma/client';
import { IsString, MinLength, IsOptional, IsNotEmpty, IsEmail, Matches, isBoolean, IS_BOOLEAN, IsBoolean } from 'class-validator';

export interface createWorkHourDTO {
    id?:            string  | undefined;
    day:            days    | undefined;
    available:      boolean | undefined;
    practitionerId: string  | undefined;
    startTime:      string  | undefined;
    closeTime:      string  | undefined;
    createdAt:      string  | undefined;
    updatedAt:      string  | undefined;
}

export interface workHourResponseDTO {
    status: string;
    content?: any;
    total?: number;
    code?: Number;
    timestamp?: string;
    verified?: boolean;
}

export class workHourValidationDto {
    constructor() {
        this.id              =  ''; 
        this.day             =  '';
        this.available;    
        this.practitionerId  =  '';
        this.startTime       =  '';
        this.closeTime       =  '';
    }

    @IsOptional()
    id: string;

    @IsNotEmpty({ message: 'day is a required field' })
    @IsString({ message: 'day must be a string' })
    @MinLength(3, { message: 'day must be at least 3 characters long' })
    day: string;

    @IsNotEmpty({ message: 'available is a required field' })
    @IsBoolean({ message: 'available must be a boolean' })
    available: boolean = false;

    @IsNotEmpty({ message: 'practitionerId is a required field' })
    @IsString({ message: 'practitionerId must be a string' })
    practitionerId: string;

    @IsNotEmpty({ message: 'startTime is a required field' })
    @IsString({ message: 'startTime must be a string' })
    startTime: string;

    @IsNotEmpty({ message: 'closeTime is a required field' })
    @IsString({ message: 'closeTime must be a string' })
    closeTime: string;
}