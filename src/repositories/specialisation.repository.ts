
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

    async get() {
        return this.prisma.specialisation.findMany(); 
    }

    async getbyId(id: string) {
        return this.prisma.specialisation.findUnique({
            where: {
                id: id
            }
        }); 
    }
}