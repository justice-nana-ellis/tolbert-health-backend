import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty} from 'class-validator';

export interface CreatePatientDto {
    id?: string;
    user_id: string;
    project_name: string;
    description: string;
}

export interface createProjectInput {
    id?: string;
    user_id: string;
    project_name: string;
    description: string;
}

export interface updateProjectInput {
    id: string;
    user_id: string;
    project_name: string;
    description: string;
}

export interface deleteProjectInput {
    id: string;
}

export interface createProjectResponse {
    status: string;
    content: any;
    timestamp?: string;
}

export class createProjectDto {
    constructor() {
        this.id = '';
        this.user_id = '';
        this.project_name = '';
        this.description = '';
    }

    @IsOptional()
    id: string;

    @IsUUID('4')
    @IsNotEmpty({ message: 'User_id is required' })
    @MinLength(3, { message: 'user_id must be at least 3 characters long' })
    user_id: string;

    @IsNotEmpty({ message: 'Project is a required field' })
    @IsString({ message: 'Project name must be a string' })
    @MinLength(3, { message: 'Project name must be at least 3 characters long' })
    project_name: string;

    @IsOptional()
    @IsString({ message: 'Project description must be a string' })
    description: string;
}
