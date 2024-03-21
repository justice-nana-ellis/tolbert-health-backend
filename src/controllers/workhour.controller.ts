
import express, { Request, Response } from 'express';
import { createWorkHourDTO, workHourValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { WorkHourService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class WorkHourController {
    public router = express.Router();
    private workHourService: WorkHourService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.workHourService = new WorkHourService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/workhour`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/workhour/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/workhour/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/workhour`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/workhour/:id`, this.getbyId.bind(this));
        this.router.get(`${this.BASE_PATH}/workhour/practitioner/:id`, this.practitionerWorkhours.bind(this));
    }

    private async create(req: Request, res: Response) {
        const postData: createWorkHourDTO = req.body;
        const errorMessages = await getErrorMessages(plainToClass(workHourValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.workHourService.create(postData);
        res.json(response); 
    }

    private async update(req: Request, res: Response) {
        const postData: createWorkHourDTO = req.body;
       
        const errorMessages = await getErrorMessages(plainToClass(workHourValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });

        const response = await this.workHourService.update(postData, req.params.id);
        res.json(response);
    }

    private async delete(req: Request, res: Response) {
        const response = await this.workHourService.delete(req.params.id);
        res.json(response);
    }

    private async get(req: Request, res: Response) {
        //@ts-ignore
        const response = await this.workHourService.get(req.query.skip, req.query.take);
        res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.workHourService.getbyId(req.params.id);
        res.json(response);
    }

    private async practitionerWorkhours(req: Request, res: Response) {
        const response = await this.workHourService.getPractitionerWorkhours(req.params.id);
        res.json(response);
    }

}