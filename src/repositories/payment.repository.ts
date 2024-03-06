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
            skip: Number(skip), take: Number(take),
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