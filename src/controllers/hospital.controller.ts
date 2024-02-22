
import express, { Request, Response } from 'express';
import { hospitalDTO, hospitalValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { HospitalService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class HospitalController {
    public router = express.Router();
    private hospitalService: HospitalService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.hospitalService = new HospitalService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/hospital`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/hospital/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/hospital/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/hospital`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/hospital/:id`, this.getbyId.bind(this));
    }

    private async create(req: Request, res: Response) {
        const postData: hospitalDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(hospitalValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.hospitalService.create(postData);
        res.json(response); 
    }

    private async update(req: Request, res: Response) {
        const postData: hospitalDTO = req.body;
       
        const errorMessages = await getErrorMessages(plainToClass(hospitalValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.hospitalService.update(postData, req.params.id);
        res.json(response);
    }

    private async delete(req: Request, res: Response) {
        const response = await this.hospitalService.delete(req.params.id);
        res.json(response);
    }

    private async get(req: Request, res: Response) {
        const response = await this.hospitalService.get();
        res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.hospitalService.getbyId(req.params.id);
        res.json(response);
    }

}