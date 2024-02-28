
import { PrismaClient } from "@prisma/client";
import { signupPractitionerDTO, signinPractitionerDTO } from "../dto"

export class PractitionerRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(practitionerData: signupPractitionerDTO) {
        return this.prisma.practitioner.create({
        //@ts-ignore
            data: practitionerData 
        }); 
    }

    async signin(patientData: signinPractitionerDTO) {
        try {
            
            return this.prisma.practitioner.findUnique({
                where: {
                    email: patientData.email
                }
            });
        } catch (error: any) {
            
        }
        
    }

    async logout(id: string) {
        return this.prisma.practitioner.findUnique({
            where: {
                id: id
            }
        }); 
    }
    
    async getallPractitioners(skipped: number, taken: number): Promise<any[]> {
        const skip = Number(skipped)
        const take = Number(taken)
        return this.prisma.practitioner.findMany({
            skip,
            //@ts-ignore
             take,
            select: {
                //@ts-ignore
                id: true,
                full_name: true,
                dob: true,
                pob: true,
                img_url: true,
                digital_address: true,
                contact: true,
                status: true,
                id_number: true,
                licence_number: true,
                hospitals: true,
                specialisations: true,
                password: false,
            }
        });
    }

    async getRandomPractitioners(count: number): Promise<any[]> {
        return this.prisma.practitioner.findMany({
            take: count, 
            select: {
                id: true,
                full_name: true,
                img_url: true
            
            },
            orderBy: {
                //@ts-ignore
                _random: true 
            }
        });
    }

    async findPractitionersByName(name: string): Promise<any[]> {
        return this.prisma.practitioner.findMany({
            where: {
                full_name: {
                    contains: name
                }
            },
            select: {
                id: true,
                full_name: true,
                img_url: true
            }
        });
    }

    // async docInfo(practitioner: array) {
    //     return this.prisma.practitioner.findUnique({
    //         //@ts-ignore
    //         where: {
    //             //@ts-ignore
    //             full_name: practitioner[0]
    //         },
    //         select: {
    //             id: true,
    //             full_name: true,
    //             img_url: true
    //         }
    //     });
    // }

    async hospitalExists(hospitals: string[]) {
        return this.prisma.hospital.findMany({
            where: {
              id: {
                in: hospitals,
              },
            },
            select: {
              id: true,
            },
          });
    }

    async specialisationExists(specialisations: string[]) {
        return this.prisma.specialisation.findMany({
            where: {
              id: {
                in: specialisations,
              },
            },
            select: {
              id: true,
            },
          });
    }
}