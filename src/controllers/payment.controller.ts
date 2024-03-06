
import express, { Request, Response } from 'express';
import { completePaymentValidationDto, initialisePaymentDTO, initialisePaymentValidationDto  } from '../dto';
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
        this.router.get(`${this.BASE_PATH}/payment`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/payment/verify`, this.verify.bind(this));
        this.router.post(`${this.BASE_PATH}/payment`, this.create.bind(this));
        this.router.post(`${this.BASE_PATH}/payment/complete`, this.complete.bind(this));
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

    private async verify (req: Request, res: Response) {
        //@ts-ignore
        const response = await this.paymentService.verify(req.query.reference);
        res.json(response);
    }

    private async get (req: Request, res: Response) {
        //@ts-ignore
        const response = await this.paymentService.get(req.query.skip, req.query.take);
        res.json(response);
    }

    private async create (req: Request, res: Response) {
        //@ts-ignore
        const response = await this.paymentService.create(req.body);
        res.json(response);
    }

    private async complete(req: Request, res: Response) {
        const paymentData = req.body;
        const errorMessages = await getErrorMessages(plainToClass(completePaymentValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(200).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });
        const response = await this.paymentService.complete(paymentData);
        //@ts-ignore
        res.json(response);
    }
}