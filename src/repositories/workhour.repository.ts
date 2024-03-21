
import { PrismaClient } from "@prisma/client";
import { createWorkHourDTO } from "../dto";

export class WorkHourRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(workhourData: createWorkHourDTO) {
        return this.prisma.workhours.create({
            data: workhourData
        }); 
    }

    async update(workhourData: createWorkHourDTO, id: string) {
        return this.prisma.workhours.update({
            where: {
                id: id
            }, data: workhourData
        }); 
    }

    async delete(id: string) {
        return this.prisma.workhours.delete({
            where: {
                id: id
            }
        }); 
    }

    async get(skip: number, take: number) {
        return this.prisma.workhours.findMany({
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            },
        }); 
    }

    async getbyId(id: string) {
        return this.prisma.workhours.findUnique({
            where: {
                id: id
            }
        }); 
    }

    async getpractitionerWorkhours(id: string) {
        return this.prisma.workhours.findMany({
            where: {
                practitionerId: id
            },
            orderBy: {
                updatedAt: 'desc' 
            }
        }); 
    }
}