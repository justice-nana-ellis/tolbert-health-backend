
import { PrismaClient } from "@prisma/client";
import { specialisationDTO } from "../dto";

export class SpecialisationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(specialisationData: specialisationDTO) {
        return this.prisma.specialisation.create({
            data: specialisationData
        }); 
    }

    async update(specialisationData: specialisationDTO, id: string) {
        return this.prisma.specialisation.update({
            where: {
                id: id
            }, data: {
                name: specialisationData.name
            }
        }); 
    }

    async delete(id: string) {
        return this.prisma.specialisation.delete({
            where: {
                id: id
            }
        }); 
    }

    async get(skip: number, take: number) {
        return this.prisma.specialisation.findMany({
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            },
        }); 
    }

    async count () {
        return this.prisma.specialisation.count({
            where: {
                deleted: false
            }
        });
    }

    async getbyId(id: string) {
        return this.prisma.specialisation.findUnique({
            where: {
                id: id
            }
        }); 
    }
}