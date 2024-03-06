
import express, { Request, Response } from 'express';
import { specialisationDTO, specialisationValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { SpecialisationService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class SpecialisationController {
    public router = express.Router();
    private specialisationService: SpecialisationService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.specialisationService = new SpecialisationService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/specialisation`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/specialisation/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/specialisation/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/specialisation`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/specialisation/:id`, this.getbyId.bind(this));
    }

    private async create(req: Request, res: Response) {
        const postData: specialisationDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(specialisationValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });
        const response = await this.specialisationService.create(postData);
        res.json(response); 
    }

    private async update(req: Request, res: Response) {
        const postData: specialisationDTO = req.body;
        const errorMessages = await getErrorMessages(plainToClass(specialisationValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
            status: 'error',
            content: { message: errorMessages }, 
            timestamp: timestamp,
        });
        const response = await this.specialisationService.update(postData, req.params.id);
        res.json(response);
    }

    private async delete(req: Request, res: Response) {
        const response = await this.specialisationService.delete(req.params.id);
        res.json(response);
    }

    private async get(req: Request, res: Response) {
        //@ts-ignore
        const response = await this.specialisationService.get(req.query.skip, req.query.take);
        res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.specialisationService.getbyId(req.params.id);
        res.json(response);
    }

}