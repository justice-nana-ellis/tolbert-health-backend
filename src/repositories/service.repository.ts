import { PrismaClient } from "@prisma/client";
import { serviceDTO } from "../dto";

export class ServiceRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(serviceData: serviceDTO) {
        return this.prisma.service.create({
            //@ts-ignore
            data: serviceData
        }); 
    }

    async update(serviceData: serviceDTO, id: string) {
        return this.prisma.service.update({
            where: {
                id: id
            }, data: {
                name: serviceData.name
            }
        }); 
    }

    async delete(id: string) {
        return this.prisma.service.delete({
            where: {
                id: id
            }
        }); 
    }

    async get() {
        return this.prisma.service.findMany({
            where: {
                deleted: false
            }
        }); 
    }

    async getbyId(id: string) {
        return this.prisma.service.findUnique({
            where: {
                id: id
            }
        }); 
    }

}