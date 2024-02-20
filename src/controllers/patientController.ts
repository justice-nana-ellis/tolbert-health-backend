
import express, { Request, Response } from 'express';
import { signupPatientDTO, signupPatientResponseDTO,signupPatientValidationDto  } from '../dto/patient.dto'
import { PatientService } from '../services/patientService';
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';
import { ProjectService } from '../services/ProjectService';

const timestamp = new Date().toISOString();

export class PatientController {
    public router = express.Router();
    private patientService: PatientService;
    private readonly BASE_PATH = '/health-service/api/v1'

    constructor() {
        this.patientService = new PatientService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/signup`, this.signup.bind(this));
    }

    private async signup(req: Request, res: Response) {
        const postData: signupPatientDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(signupPatientValidationDto, req.body));
     
      if (errorMessages.length > 0) return res.status(400).json({
        status: 'error',
        content: { message: errorMessages }, 
        timestamp: timestamp,
      });


        const response = await this.patientService.signup(postData);
        res.json(response);
        // return <patientSignupResponseDTO> {
        //     status: 'success',
        //     response
        //   }
    }
}