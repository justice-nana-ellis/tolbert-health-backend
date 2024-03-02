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
        const amount = newAmount.trimEnd().toString();
        return await this.paystack.transaction.initialize({
            email,
            amount
        });
    }

    async complete(paymentData: completePaymentDTO) {
        //const { amount, patientId, } = paymentData

        superagent

        // return this.prisma.service.update({
        //     where: {
        //         id: id
        //     }, data: {
        //         name: serviceData.name
        //     }
        // }); 
    }

    // async delete(id: string) {
    //     return this.prisma.service.delete({
    //         where: {
    //             id: id
    //         }
    //     }); 
    // }

    // async get() {
    //     return this.prisma.service.findMany(); 
    // }

    // async getbyId(id: string) {
    //     return this.prisma.service.findUnique({
    //         where: {
    //             id: id
    //         }
    //     }); 
    // }

}