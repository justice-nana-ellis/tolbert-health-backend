
import express, { Request, Response } from 'express';
import { appointmentDTO, appointmentValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { AppointmentService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class AppointmentController {
    public router = express.Router();
    private appointmentService: AppointmentService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.appointmentService = new AppointmentService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/appointment`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/appointment/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/appointment/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/appointment`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/appointment/:id`, this.getbyId.bind(this));
    }

    private async create(req: Request, res: Response) {
        const postData: appointmentDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(appointmentValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.appointmentService.create(postData);
        res.status(200).json(response); 
    }

    private async update(req: Request, res: Response) {
        const postData: appointmentDTO = req.body;
       
        const errorMessages = await getErrorMessages(plainToClass(appointmentValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.appointmentService.update(postData, req.params.id);
        res.status(200).json(response);
    }

    private async delete(req: Request, res: Response) {
        const response = await this.appointmentService.delete(req.params.id);
        res.status(200).json(response);
    }

    private async get(req: Request, res: Response) {
        const response = await this.appointmentService.get();
        res.status(200).json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.appointmentService.getbyId(req.params.id);
        res.status(200).json(response);
    }

}