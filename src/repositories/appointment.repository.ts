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
            }
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