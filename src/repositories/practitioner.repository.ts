
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

    async association(practitionerData: signupPractitionerDTO) {
        return this.prisma.practitionerhospitalspecialisation.create({
            //@ts-ignore
            data: {
                practitionerId: practitionerData.id,
                hospitalId: practitionerData.hospitalId, 
                specialisationId: practitionerData.specialisationId,
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

    async getbyId(id: string) {
        return this.prisma.practitioner.findUnique({
            where: {
                id: id
            },
            include: {
                specialisation: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true,
                        street: true,
                        country: true
                    }
                },
        },
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

    async searchPractitioner(queryString: string, limit: Number) {
        return this.prisma.practitioner.findMany({
          where: {
            OR: [
              {
                full_name: {
                    contains: queryString.toLowerCase(),
                    mode: 'insensitive',
                },
              },
              {
                qualification: {
                    contains: queryString.toLowerCase(),
                    mode: 'insensitive',
                },
              },
              {
                email: {
                    contains: queryString.toLowerCase(),
                    mode: 'insensitive',
                },
              },
              {
                city: {
                    contains: queryString.toLowerCase(),
                    mode: 'insensitive',
                },
              },
              {
                country: {
                    contains: queryString.toLowerCase(),
                    mode: 'insensitive',
                },
              },
              // Include a nested OR clause for practitionerhospitalspecialisation fields
              {
                practitionerhospitalspecialisation: {
                  some: {
                    OR: [
                      {
                        specialisation: {
                          // No need for case-insensitive comparison here
                          name: {
                            contains: queryString.toLowerCase(),
                            mode: 'insensitive',
                          },
                        },
                      },
                    ],
                  }
                },
              },
            ],
          },
          select: {
            id: true,
            full_name: true,
            email: true,
            city: true,
            country: true,
            img_url: true,
            qualification: true,
            active: false,
            specialisation: {
                select: {
                    name:  true
                }
            },
            hospital: false,
          },
          take: Number(limit),
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

    async pending(limit: Number) {
        return this.prisma.practitioner.findMany({
            where: {
                status: "pending"
            },
            take: Number(limit)
        });
    }

    async count() {
        return this.prisma.practitioner.count();
    }
}