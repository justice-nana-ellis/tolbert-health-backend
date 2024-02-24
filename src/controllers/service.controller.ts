
import express, { Request, Response } from 'express';
import { serviceDTO, serviceValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { ServiceService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class ServiceController {
    public router = express.Router();
    private serviceService: ServiceService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.serviceService = new ServiceService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/service`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/service/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/service/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/service`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/service/:id`, this.getbyId.bind(this));
    }

    private async create(req: Request, res: Response) {
        const postData: serviceDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(serviceValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.serviceService.create(postData);
        res.json(response); 
    }

    private async update(req: Request, res: Response) {
        const postData: serviceDTO = req.body;
       
        const errorMessages = await getErrorMessages(plainToClass(serviceValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.serviceService.update(postData, req.params.id);
        res.json(response);
    }

    private async delete(req: Request, res: Response) {
        const response = await this.serviceService.delete(req.params.id);
        res.json(response);
    }

    private async get(req: Request, res: Response) {
        const response = await this.serviceService.get();
        res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.serviceService.getbyId(req.params.id);
        res.json(response);
    }

}