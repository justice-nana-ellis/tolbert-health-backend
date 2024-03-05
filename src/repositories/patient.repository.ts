
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

    async getbyId(id: string) {
        return this.prisma.patient.findUnique({
            where: {
                id: id,
                deleted: false
            }
        }); 
    }

    async getallPatients(skipped: number, taken: number): Promise<any[]> {
        const skip = Number(skipped)
        const take = Number(taken)
        return this.prisma.patient.findMany({
            where: {
                deleted: false
            },
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

    async searchPatient (queryString: string, limit: Number){
        return this.prisma.patient.findMany({
            where: {
                deleted: false,
                OR: [
                    {
                        full_name: {
                            contains: queryString.toLowerCase(),
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            select: {
                id: true,
                full_name: true,
                img_url: true,
                country: true,
                city: true,
                zip: true,
                access_level: true,
                active: true,
                verified: true
            },
            take: Number(limit)
        });
    }

    async count () {
        return this.prisma.patient.count({
            where: {
                deleted: false
            }
        });
    }

    async countDeleted () {
        return this.prisma.patient.count({
            where: {
                deleted: true
            }
        });
    }

    async delete (id: string) {
        return this.prisma.patient.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        });
    }

    async updateVerification (email: string) {
        const exist = await this.prisma.patient.findUnique({
            where: { email }
        })
        if (exist !== null) {
            return this.prisma.patient.update({
                where: { email },
                data: {
                    verified: true,
                    active: true
                }
            });
        }
    }

    async getAppointment (id: string, status: string[], skipped: number, limit: number) {
        const skip = Number(skipped)
        const take = Number(limit)
        return this.prisma.appointment.findMany({
            where: {
                patientId: id,
                status: {
                    //@ts-ignore
                    in: status,
                },
                deleted: false
            },
            take: take,
            skip: skip
        });
    }

    async countAppointment (id: string, status: string[]) {
        
        return this.prisma.appointment.count({
            where: {
              patientId: id,
              deleted: false,
              //@ts-ignore
              AND: {
                status: {
                  in: status,
                },
              },
            },
          });
    }
}