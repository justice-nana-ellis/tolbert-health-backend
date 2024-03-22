import { IsString, MinLength, IsOptional, IsIn, IsNotEmpty, IsEmail, Matches, IsBoolean } from 'class-validator';

export interface signupPractitionerDTO {
    id:        string;
    email:     string;      
    full_name: string;
    password:  string;
    dob:       string;
    pob:       string;
    img_url:   string;
    location:  string;
    longitude: number;
    latitude:  number;
    summary?:  string;
    digital_address: string;
    contact:         string;
    id_type:         indentity_card;     
    id_number:       string;
    status:          string;
    qualification:   string;
    licence_number:  string;
    specialisationId: string; 
    hospitalId:       string;
    appointments:    string[];
    verified:        boolean;       
}

export interface signupPractitionerResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: Boolean;
}

export interface signupPractitionerResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: Boolean;
}

export interface signinPractitionerResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
    token?: string;
}

export interface signinPractitionerDTO {
    email: string;
    password: string;
}

export interface logoutPractitionerResponseDTO {
    status: string;
    content?: any;
    timestamp?: string;
    verified?: boolean;
    token?: string;
}

export interface getAllPractitionerResponseDTO {
    status: string;
    total?: number;
    content?: any;
    timestamp?: string;
    verified?: boolean;
    token?: string;
}

enum indentity_card {
    GHANA_CARD = "GHANA_CARD",
    VOTER_ID = "VOTER_ID",
    PASSPORT = "PASSPORT",
    DRIVING_LICENCE = "DRIVING_LICENCE",
}

export class signupPractitionerValidationDto {

    constructor() {
        this.id = '';
        this.email = '';
        this.full_name = '';
        this.password = '';
        this.dob = '';
        this.pob = '';
        this.location = '';
        this.longitude =  '';
        this.latitude =  '';
        this.digital_address = '';
        this.contact = '';
        this.id_type = '';
        this.id_number = '';
        this.status = '';
        this.qualification = '';
        this.licence_number = '';
        this.specialisation = '';
        this.hospital = '';
        this.appointments = [];
        this.verified;
        this.summary = '';
    }

    @IsOptional()
    id: string;

    @IsOptional()
    summary: string;

    @IsOptional()
    location: string;

    @IsOptional()
    longitude: string;

    @IsOptional()
    latitude: string;

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

    @IsString({ message: 'Date of Birth must be a string' })
    @IsNotEmpty({ message: 'Date of Birth is a required field' })
    dob: string;

    @IsString({ message: 'Place of Birth must be a string' })
    @IsNotEmpty({ message: 'Place of Birth is a required field' })
    pob: string;

    @IsString({ message: 'Digital Address must be a string' })
    @IsNotEmpty({ message: 'Digital Address is a required field' })
    digital_address: string;

    @IsString({ message: 'Contact must be a string' })
    @IsNotEmpty({ message: 'Contact is a required field' })
    contact: string;

    @IsString({ message: 'ID Type must be a string' })
    @IsNotEmpty({ message: 'ID Type is a required field' })
    @IsIn(['ghana_card', 'voter_id', 'passport', 'driving_license'], { message: 'ID Type must be one of: ghana_card, voter_id, passport, or driving_license' })
    id_type: string;

    @IsString({ message: 'ID Number must be a string' })
    @IsNotEmpty({ message: 'ID Number is a required field' })
    @MinLength(5, { message: 'ID Number must be at least 5 characters long' })
    id_number: string;

    //@IsString({ message: 'Status must be a string' })
    //@IsNotEmpty({ message: 'Status is a required field' })
    //@IsIn(['rejected', 'approved', 'pending'], { message: 'Status must be one of: rejected, approved, or pending' })
    status: string;

    @IsString({ message: 'Qualification must be a string' })
    @IsNotEmpty({ message: 'Qualification is a required field' })
    qualification: string;

    @IsString({ message: 'Licence Number must be a string' })
    @IsNotEmpty({ message: 'Licence Number is a required field' })
    licence_number: string;

    @IsOptional()
    specialisation: string;

    @IsOptional()
    hospital: string;

    @IsOptional()
    appointments: string[];

    @IsOptional()
    verified: boolean = false;
}

export class updatePractitionerValidationDto {

    constructor() {
        this.id = '';
        this.email = '';
        this.full_name = '';
        this.dob = '';
        this.pob = '';
        this.location = '';
        this.digital_address = '';
        this.contact = '';
        this.id_type = '';
        this.id_number = '';
        this.status = '';
        this.longitude =  '';
        this.latitude =  '';
        this.qualification = '';
        this.licence_number = '';
        this.specialisation = '';
        this.hospital = '';
        this.appointments = [];
        this.verified;
        this.summary = '';
    }

    @IsOptional()
    id: string;

    @IsOptional()
    summary: string;

    @IsOptional()
    location: string;

    @IsOptional()
    longitude: string;

    @IsOptional()
    latitude: string

    @IsNotEmpty({ message: 'Email is a required field' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'full_name is a required field' })
    @IsString({ message: 'full_name must be a string' })
    @MinLength(3, { message: 'full_name must be at least 3 characters long' })
    full_name: string;

    @IsString({ message: 'Date of Birth must be a string' })
    @IsNotEmpty({ message: 'Date of Birth is a required field' })
    dob: string;

    @IsString({ message: 'Place of Birth must be a string' })
    @IsNotEmpty({ message: 'Place of Birth is a required field' })
    pob: string;

    @IsString({ message: 'Digital Address must be a string' })
    @IsNotEmpty({ message: 'Digital Address is a required field' })
    digital_address: string;

    @IsString({ message: 'Contact must be a string' })
    @IsNotEmpty({ message: 'Contact is a required field' })
    contact: string;

    @IsString({ message: 'ID Type must be a string' })
    @IsNotEmpty({ message: 'ID Type is a required field' })
    @IsIn(['ghana_card', 'voter_id', 'passport', 'driving_license'], { message: 'ID Type must be one of: ghana_card, voter_id, passport, or driving_license' })
    id_type: string;

    @IsString({ message: 'ID Number must be a string' })
    @IsNotEmpty({ message: 'ID Number is a required field' })
    @MinLength(5, { message: 'ID Number must be at least 5 characters long' })
    id_number: string;

    //@IsString({ message: 'Status must be a string' })
    //@IsNotEmpty({ message: 'Status is a required field' })
    //@IsIn(['rejected', 'approved', 'pending'], { message: 'Status must be one of: rejected, approved, or pending' })
    status: string;

    @IsString({ message: 'Qualification must be a string' })
    @IsNotEmpty({ message: 'Qualification is a required field' })
    qualification: string;

    @IsString({ message: 'Licence Number must be a string' })
    @IsNotEmpty({ message: 'Licence Number is a required field' })
    licence_number: string;

    @IsOptional()
    specialisation: string;

    @IsOptional()
    hospital: string;

    @IsOptional()
    appointments: string[];

    @IsOptional()
    verified: boolean = false;
}

export class signinPractitionerValidationDto {
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