
import { IsString, MinLength, IsOptional, IsNotEmpty, IsEmail, Matches } from 'class-validator';

export interface otpDTO {
    id?: string;
    user_id?: string;
    email?: string;
    otp_code: string;
}
