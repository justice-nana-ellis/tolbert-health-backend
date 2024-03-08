import { PrismaClient } from "@prisma/client";
import { hospitalDTO } from "../dto";

export class HospitalRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(hospitalData: hospitalDTO){
        return this.prisma.hospital.create({
            //@ts-ignore
            data: hospitalData
        }); 
    }

    async update(hospitalData: hospitalDTO, id: string) {
        return this.prisma.hospital.update({
            where: {
                id: id
            }, data: hospitalData
        }); 
    }

    async delete(id: string) {
        return this.prisma.hospital.delete({
            where: {
                id: id
            }
        }); 
    }

    async get(skip: number, take: number) {
        return this.prisma.hospital.findMany({
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            }
        }); 
    }

    async count () {
        return this.prisma.hospital.count({
            where: {
                deleted: false
            }
        });
    }

    async getbyId(id: string) {
        return this.prisma.hospital.findUnique({
            where: {
                id: id
            }
        }); 
    }

}