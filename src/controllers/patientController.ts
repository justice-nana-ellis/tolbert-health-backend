
import express, { Request, Response } from 'express';
import { RegisterPatientDTO } from '../dto/patient.dto'
import { PatientService } from '../services/patientService';

export class PatientController {
    public router = express.Router();
    private patientService: PatientService;
    private readonly BASE_PATH = '/health-service/api/v1'

    constructor() {
        this.patientService = new PatientService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.BASE_PATH}/signup`, this.signup.bind(this));
    }

    private async signup(req: Request, res: Response) {
        const postData: RegisterPatientDTO = req.body;
        const patientData = await this.patientService.signup(postData);
        res.json(patientData);
    }
}