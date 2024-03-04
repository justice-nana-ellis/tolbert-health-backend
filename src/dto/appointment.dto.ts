import { IsString, IsBoolean, IsOptional, IsIn, IsNotEmpty, IsEmail, Matches, IsDateString } from 'class-validator';

export interface appointmentDTO {
    id?:       string;
    title:     string;
    date:      string;
    time:            string;
    practitioner:    string;
    patient:         string;
    service:           string;
    hospital:          string;
    comment:           string;
    tc:                Boolean
    payment_completed: Boolean
    status:            string;
    expiry:            string;
}

export interface appointmentResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
}

export class appointmentValidationDto {
    constructor() {
        this.id     =            '';
        this.title  =            '';
        this.date   =            '';
        this.time   =            '';
        this.practitioner =      '';
        this.patient = '';
        this.service      =      '';
        this.comment      =      '';
        this.tc;           
        this.payment_completed;   
        this.status              =      '';
        this.expiry              =      '';
    }

    @IsString({ message: 'ID must be a string' })
    @IsOptional()
    id?: string;

    @IsNotEmpty({ message: 'Title is a required field' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Date is a required field' })
    @IsString({ message: 'Date must be a string' })
    date: string;

    @IsNotEmpty({ message: 'Time is a required field' })
    @IsString({ message: 'Time must be a string' })
    time: string;

    @IsNotEmpty({ message: 'Practitioner is a required field' })
    //@IsString({ message: 'Practitioner must be a string' })
    //@IsOptional()
    practitioner: string;

    //@IsNotEmpty({ message: 'Practitioner is a required field' })
    @IsOptional()
    patient: string;

    @IsNotEmpty({ message: 'Service is a required field' })
    @IsString({ message: 'Service must be a string' })
    service: string;

    @IsNotEmpty({ message: 'Comment is a required field' })
    @IsString({ message: 'Comment must be a string' })
    comment: string;

    @IsOptional({ message: 'TC is a required field' })
    @IsBoolean({ message: 'TC must be a boolean string' })
    tc: boolean = true;

    @IsNotEmpty({ message: 'Payment Completed is a required field' })
    @IsBoolean({ message: 'Payment Completed must be a boolean' })
    payment_completed: boolean = false;;

    @IsNotEmpty({ message: 'Status is a required field' })
    @IsString({ message: 'Status must be a string' })
    @IsIn(['rejected', 'approved', 'pending'], { message: 'Status must be one of: rejected, approved, pending' })
    status: string;

    @IsNotEmpty({ message: 'Expiry is a required field' })
    @IsString({ message: 'Expiry must be a valid date string' })
    expiry: string;
}