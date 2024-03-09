
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

    async update (practitionerData: signupPractitionerDTO, id: string) {
        return this.prisma.practitioner.update({
            where: {
                id: id,
            },
            //@ts-ignore
            data: practitionerData,
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
        })
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
                id: id,
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
    
    async getallPractitioners(skip: number, take: number) {
        return this.prisma.practitioner.findMany({
            select: {
                //@ts-ignore
                id: true,
                full_name: true,
                email: true,
                dob: true,
                pob: true,
                img_url: true,
                digital_address: true,
                country: true,
                contact: true,
                status: true,
                id_number: true,
                id_type: true,
                active: true,
                deleted: true,
                licence_number: true,
                certificates: true,
                hospital: true,
                longitude: true,
                latitude: true,
                specialisation: true,
                qualification: true,
                password: false,
            },
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            },
        });
    }

    async top5 () {
        const totalCount = await this.prisma.practitioner.count(); 
        const randomSkip = Math.floor(Math.random() * (totalCount - 5)); 
        return this.prisma.practitioner.findMany({
            select: {
                //@ts-ignore
                id: true,
                full_name: true,
                email: true,
                dob: true,
                pob: true,
                img_url: true,
                digital_address: true,
                country: true,
                contact: true,
                status: true,
                id_number: true,
                id_type: true,
                active: true,
                licence_number: true,
                longitude: true,
                latitude: true,
                password: false,
            },
            skip: randomSkip,
            take: 5,
            orderBy: {
                updatedAt: 'desc' 
            },
        });
    }    

    async searchPractitioner(queryString: string, limit: Number) {
        return this.prisma.practitioner.findMany({
          where: {
            //deleted: false,
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
              {
                practitionerhospitalspecialisation: {
                  some: {
                    OR: [
                      {
                        specialisation: {
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
            rating: true,
            city: true,
            country: true,
            img_url: true,
            qualification: true,
            active: false,
            longitude: true,
            latitude: true,
            specialisation: {
                select: {
                    name:  true
                }
            },
            hospital: {
                select: {
                    name:  true,
                    city: true,
                    zip: true,
                    street: true,
                    country: true,
                }
            },
          },
          take: Number(limit),
        });
    }

    async hospitalExists(id: string) {
        return this.prisma.hospital.findUnique({
            where: {
              id: id,
              deleted: false
            }
          });
    }

    async specialisationExists(id: string) {
        return this.prisma.specialisation.findUnique({
            where: {
                id: id,
                deleted: false
              }
          });
    }

    async pending (skip: Number, take: number) {
        return this.prisma.practitioner.findMany({
            where: {
                status: "pending",
                deleted: false
            },
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            }
        });
    }

    async count() {
        return this.prisma.practitioner.count({
            where: {
                deleted: false
            }
        });
    }

    async countPending () {
        return this.prisma.practitioner.count({
            where: {
                status: "pending",
                deleted: false
            }
        });
    }

    async countDeleted () {
        return this.prisma.practitioner.count({
            where: {
                deleted: true
            }
        });
    }

    async countApproved () {
        return this.prisma.practitioner.count({
            where: {
                status: "approved",
                deleted: false
            }
        });
    }

    async countRejected () {
        return this.prisma.practitioner.count({
            where: {
                status: "rejected",
                deleted: false
            }
        });
    }

    async delete (id: string) {
        return this.prisma.practitioner.update({
            where: {
                id: id
            },
            data: {
                deleted: true
            }
        });
    }

    async updateVerification (email: string) {
        const exist = await this.prisma.practitioner.findUnique({
            where: { email }
        })
        if (exist !== null) {
            return this.prisma.practitioner.update({
                where: { email },
                data: {
                    verified: true,
                    active: true
                }
            });
        }
    }
}