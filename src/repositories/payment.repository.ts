import { Paystack } from 'paystack-sdk';
import { PrismaClient } from "@prisma/client";
import { initialisePaymentDTO, completePaymentDTO } from "../dto";

export class PaymentRepository {
    private prisma: PrismaClient;
    private paystack: Paystack;

    constructor() {
        this.prisma = new PrismaClient();
        this.paystack = new Paystack("sk_test_03b42fc51c7f94c819ccf44959a2c75f613de312");
    }

    async initialise(email: string, amount: string){
        return await this.paystack.transaction.initialize({
            email,
            amount
        });
    }

    async complete(paymentData: completePaymentDTO) {
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