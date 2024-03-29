import { Paystack } from 'paystack-sdk';
import superagent from 'superagent';
import { PrismaClient } from "@prisma/client";
import { initialisePaymentDTO, completePaymentDTO } from "../dto";

export class PaymentRepository {
    private prisma: PrismaClient;
    private paystack: Paystack;
    private readonly SECRET_KEY = <string>process.env.PAYSTACK_SECRET_KEY

    constructor() {
        this.prisma = new PrismaClient();
        this.paystack = new Paystack(this.SECRET_KEY);
    }

    async initialise(email: string, newAmount: string){
        const amount = (Math.round(Number(newAmount.trimEnd())) * 100).toString();
        return await this.paystack.transaction.initialize({
            email,
            amount 
        });
    }

    async verify(referenceId: string) {  
        const url = `https://api.paystack.co/transaction/verify/${referenceId}`
        return await superagent
                        .get(url)
                        .set('Authorization', `Bearer ${this.SECRET_KEY}`)  
                        .set('Content-Type', 'application/json')
                        .set('Cache-Control', 'no-cache');
    }

    async create(paymentData: completePaymentDTO) {
        //@ts-ignore
        return this.prisma.payment.create({ data: paymentData });
    }

    async get(skip: number, take: number) {
        return this.prisma.payment.findMany({
            where: {
                deleted: false
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true,
                        country: true,
                        img_url: true,
                        zip: true,
                        city: true

                    }
                },
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                    }
                }
            },
            skip: Number(skip), take: Number(take),
            orderBy: {
                updatedAt: 'desc' 
            }
        }); 
    }

    async allRecords() {
        return this.prisma.payment.findMany({
            where: {
                deleted: false
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc' 
            }
        }); 
    }

    async patientExists(id: string) {
        return this.prisma.patient.findUnique({
            where: {
              id: id
            }
          });
    }

    async getPatientPayment(id: string) {
        return this.prisma.payment.findMany({
            where: {
              patientId: id,
              deleted: false
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        practitioner: {
                            select: {
                                id: true,
                                full_name: true,
                                email: true,
                                img_url: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc' 
            }
          });
    }

    async serviceExists(id: string) {
        return this.prisma.service.findUnique({
            where: {
              id: id
            }
        });
    }

    async count () {
        return this.prisma.payment.count({
            where: {
                deleted: false
            }
        });
    }

}