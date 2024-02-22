import { PrismaClient } from "@prisma/client";
import { hospitalDTO } from "../dto";

export class HospitalRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(hospitalData: hospitalDTO) {
        return this.prisma.hospital.create({
            data: hospitalData
        }); 
    }

    async update(hospitalData: hospitalDTO, id: string) {
        return this.prisma.hospital.update({
            where: {
                id: id
            }, data: {
                name: hospitalData.name
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
}