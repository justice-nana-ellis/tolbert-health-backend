
import { PrismaClient } from "@prisma/client";
import { signupPatientDTO, signinPatientDTO  } from "../dto";

export class PatientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(patientData: signupPatientDTO) {
        return this.prisma.patient.create({
            data: patientData
        }); 
    }

    async signin(patientData: signinPatientDTO) {    
        return this.prisma.patient.findUnique({
            where: {
                email: patientData.email
            }
        }); 
    }

    async logout(id: string) {
        return this.prisma.patient.findUnique({
            where: {
                id: id
            }
        }); 
    }

    async getallPatients(skipped: number, taken: number): Promise<any[]> {
        const skip = Number(skipped)
        const take = Number(taken)
        return this.prisma.patient.findMany({
            skip,
            //@ts-ignore
             take,
            select: {
                //@ts-ignore
                id: true,
                full_name: true,
                email: true,
                active: true,
                country: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    async searchPatient(queryString: string, limit: Number){
        return this.prisma.patient.findMany({
            where: {
                OR: [
                    {
                        full_name: {
                            contains: queryString
                        }
                    }
                ]
            },
            select: {
                id: true,
                full_name: true,
                img_url: true,
                active: true
                
            },
            take: Number(limit)
        });
    }
}