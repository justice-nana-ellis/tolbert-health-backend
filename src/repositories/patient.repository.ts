
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

    async update (patientData: signupPatientDTO, id: string) {
        return this.prisma.patient.update({
            where: {
                id: id,
            },
            data: patientData
        })
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
                id: id
            }
        }); 
    }

    async getallPatients(skip: number, take: number) {
        return this.prisma.patient.findMany({
            select: {
                //@ts-ignore
                id: true,
                full_name: true,
                email: true,
                country: true,
                active: true,
                deleted: true,
                createdAt: true,
                updatedAt: true,
            },
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
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
                    },
                    {
                        email: {
                            contains: queryString.toLowerCase(),
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                img_url: true,
                country: true,
                city: true,
                zip: true,
                access_level: true,
                active: true,
                verified: true,
                deleted: true
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

    async getPatientAppointment (id: string, status: string[], skipped: number, limit: number) {
        const skip = Number(skipped);
        const take = Number(limit);
        return this.prisma.appointment.findMany({
            where: {
                patientId: id,
                status: {
                    //@ts-ignore
                    in: status,
                },
                deleted: false
            },
            select: {
                id: true,
                title: true,
                date: true,
                time: true,
                comment: true,
                tc: true,
                payment_completed: true,
                deleted: true,
                status: true,
                expiry: true,
                patientId: true,
                practitioner: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        img_url: true,
                        specialisation: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                        hospital: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                street: true,
                                country: true,
                            }
                        },
                    }
                },
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            },
            take: take,
            skip: skip,
            orderBy: {
                updatedAt: 'desc' 
            }
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