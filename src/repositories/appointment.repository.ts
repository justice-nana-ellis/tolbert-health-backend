import { PrismaClient } from "@prisma/client";
import { appointmentDTO } from "../dto";

export class AppointmentRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findDoc(id: string){
        return await this.prisma.practitioner.findUnique({
            where: { id: id }
        });
    }
    
    async create(appointmentData: appointmentDTO) {
        return this.prisma.appointment.create({
            //@ts-ignore
            data: appointmentData
        }); 
    }

    async update(appointmentData: appointmentDTO, id: string) {
        return this.prisma.appointment.update({
            where: {
                id: id
                //@ts-ignore
            }, data: appointmentData
        }); 
    }

    async delete(id: string) {
        return this.prisma.appointment.delete({
            where: {
                id: id
            }
        }); 
    }

    async get() {
        return this.prisma.appointment.findMany(); 
    }

    async getbyId(id: string) {
        return this.prisma.appointment.findUnique({
            where: {
                id: id
            }
        }); 
    }

}