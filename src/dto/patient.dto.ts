
import { IsString, MinLength, IsOptional, IsUUID, IsNotEmpty} from 'class-validator';

export interface RegisterPatientDTO {
    id?: string;
    email: string;
    full_name: string;
    password: string;
}