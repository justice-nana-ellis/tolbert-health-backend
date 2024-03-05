
import { PrismaClient } from "@prisma/client";
import { signupAdminDTO, signinAdminDTO } from "../dto"

export class AdminRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(adminData: signinAdminDTO) {
        return this.prisma.admin.create({
        //@ts-ignore
            data: adminData 
        }); 
    }

    async signin(adminData: signinAdminDTO) {
        try {
            
            return this.prisma.admin.findUnique({
                where: {
                    email: adminData.email
                }
            });
        } catch (error: any) {
            
        }
        
    }

    async logout(id: string) {
        return this.prisma.admin.findUnique({
            where: {
                id: id
            }
        }); 
    }

    async get() {
        return this.prisma.admin.findMany(); 
    }

    async getbyId(id: string) {
        return this.prisma.admin.findUnique({
            where: {
                id: id
            }
        }); 
    }

    async changeStatus(id: string, status: string) {
        return this.prisma.practitioner.update({
            where: {
                id: id
            },
            data: {
                //@ts-ignore
                status: status
            }
        }); 
    }

    async updateVerification (email: string) {
        const exist = await this.prisma.admin.findUnique({
            where: { email }
        })
        if (exist !== null) {
            return this.prisma.admin.update({
                where: { email },
                data: {
                    verified: true,
                    //@ts-ignore
                    active: true
                }
            });
        }
    }
}