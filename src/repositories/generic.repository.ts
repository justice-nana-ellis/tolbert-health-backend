import { PrismaClient } from "@prisma/client";
import { otpDTO } from "../dto";

export class GenericRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async sendOTP(otpData: otpDTO) {
        return this.prisma.otp.create({
            //@ts-ignore
            data: otpData
        }); 
    }

    async verifyOtpEmail(email: string) {    
        return this.prisma.otp.findUnique({
            where: {
                email: email
            }
        }); 
    }

    async update(email: string, otp: string) {
        return this.prisma.otp.update({
            where: {
                email: email
            }, data: {
                otp_code: otp
            }
        }); 
    }

    async delete(id: string) {
        return this.prisma.hospital.delete({
            where: {
                id: id
            }
        }); 
    }

    async get() {
        return this.prisma.hospital.findMany(); 
    }

    async getbyId(id: string) {
        return this.prisma.hospital.findUnique({
            where: {
                id: id
            }
        }); 
    }

}