
import express, { Request, Response } from 'express';
import { initialisePaymentDTO, initialisePaymentValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { PaymentService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class PaymentController {
    public router = express.Router();
    private paymentService: PaymentService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.paymentService = new PaymentService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/payment/initialize`, this.initialise.bind(this));
    }

    private async initialise(req: Request, res: Response) {
        const paymentData = req.body;

        const errorMessages = await getErrorMessages(plainToClass(initialisePaymentValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(200).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.paymentService.initialise(paymentData.email, paymentData.amount);
        res.json(response); 
    }

    // private async update(req: Request, res: Response) {
    //     const postData: initialisePaymentDTO = req.body;
       
    //     const errorMessages = await getErrorMessages(plainToClass(initialisePaymentValidationDto, req.body));
    //     if (errorMessages.length > 0) return res.status(200).json({
    //         status: 'error',
    //         content: { message: errorMessages }, 
    //         timestamp: timestamp,
    //     });

    //     const response = await this.paymentService.initialise(postData.email, postData.amount);
    //     res.json(response);
    //}


}