
import { PrismaClient } from "@prisma/client";
import { signupPractitionerDTO, signinPractitionerDTO } from "../dto"

export class PractitionerRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(practitionerData: signupPractitionerDTO) {
        return this.prisma.practitioner.create({
            
            data: {
                email: practitionerData.email,
                full_name: practitionerData.full_name,
                password: practitionerData.password,
                dob: practitionerData.dob,
                pob: practitionerData.pob,
                img_url: practitionerData.img_url,
                digital_address: practitionerData.digital_address,
                contact: practitionerData.contact,
                //@ts-ignore
                id_type: practitionerData.id_type,
                id_number: practitionerData.id_number,
                qualification: practitionerData.qualification,
                licence_number: practitionerData.licence_number,
                specialisation: {
                    //@ts-ignore
                    connect: { id: practitionerData.specialisation }
                },
                hospital: {
                    //@ts-ignore
                    connect: { id: practitionerData.hospital }
                },
                verified: practitionerData.verified,
                //@ts-ignore
                status: practitionerData.status
            }
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
                country: true,
                contact: true,
                status: true,
                id_number: true,
                active: true,
                licence_number: true,
                hospital: true,
                specialisation: true,
                password: false,
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    async searchPractitioner(queryString: string, limit: Number){
        return this.prisma.practitioner.findMany({
            where: {
                OR: [
                    {
                        full_name: {
                            contains: queryString
                        }
                    },
                    {
                        qualification: {
                            contains: queryString
                        }
                    }
                ]
            },
            select: {
                id: true,
                full_name: true,
                img_url: true,
                qualification: true,
                active: true
            },
            take: Number(limit)
        });
    } 

    async hospitalExists(id: string) {
        return this.prisma.hospital.findUnique({
            where: {
              id: id
            }
          });
    }

    async specialisationExists(id: string) {
        return this.prisma.specialisation.findUnique({
            where: {
                id: id
              }
          });
    }
}