import { PrismaClient } from "@prisma/client";
import { appointmentDTO } from "../dto";

export class AppointmentRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    async create(appointmentData: appointmentDTO) { 
        return this.prisma.appointment.create({
            //@ts-ignore
            data: {...appointmentData,
                practitioner: {
                    connect: { id: appointmentData.practitioner }},
                patient: {
                    connect: { id: appointmentData.patient }},
                service: {
                    connect: { id: appointmentData.service }}
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
                        specialisation: true,
                        hospital: true,
                    }
                },
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        });
    }

    async update(appointmentData: appointmentDTO, id: string) {
        return this.prisma.appointment.update({
            where: {
                id: id
                //@ts-ignore
            }, data: {...appointmentData,
                practitioner: {
                    connect: { id: appointmentData.practitioner }},
                patient: {
                    connect: { id: appointmentData.patient }},
                service: {
                    connect: { id: appointmentData.service }}
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
        }); 
    }

    async delete(id: string) {
        return this.prisma.appointment.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        }); 
    }

    async get(skip: number, take: number) {
        return this.prisma.appointment.findMany({
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            }
        }); 
    }

    async count () {
        return this.prisma.appointment.count({
            where: {
                deleted: false
            }
        });
    }

    async getbyId(id: string) {
        return this.prisma.appointment.findUnique({
            where: {
                id: id
            }
        }); 
    }

}