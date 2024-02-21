
import express, { Request, Response } from 'express';
import { signupPatientDTO, signinPatientDTO, signupPatientValidationDto,
         signinPatientValidationDto  } from '../dto/patient.dto'
import { PatientService } from '../services/patient.service';
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';

const timestamp = new Date().toISOString();

export class PatientController {
    public router = express.Router();
    private patientService: PatientService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.patientService = new PatientService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/patient/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/patient/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/patient/logout`, this.logout.bind(this));
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
       
    }

    private async signin(req: Request, res: Response) {
      try {
        const postData: signinPatientDTO = req.body;

        const errorMessages = await getErrorMessages(plainToClass(signinPatientValidationDto, req.body));
    
        if (errorMessages.length > 0) return res.status(400).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });

        const response = await this.patientService.signin(postData);
        res.clearCookie('Tolbert-Token');
        res.cookie('Tolbert-Token', response?.token, { httpOnly: true });
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          content: 'login failed' 
        });
      }
      
    }

    private async logout(req: Request, res: Response) {
      try {
        res.clearCookie('Tolbert-Token');
        const response = await this.patientService.logout();
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          content: 'login failed' 
        });
      }
      
    }
}

