import express, { Request, Response } from 'express';
import { signupPractitionerDTO, signupPractitionerValidationDto, signinPractitionerValidationDto,
         signinPractitionerDTO  } from '../dto/practitioner.dto'
import { PractitionerService } from '../services/practitioner.service';
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';

const timestamp = new Date().toISOString();

export class PractitionerController {
    public router = express.Router();
    private practitionerService: PractitionerService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.practitionerService = new PractitionerService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/practitioner/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/logout`, this.logout.bind(this));
    }

    private async signup(req: Request, res: Response) {
      try {
        const postData = req.body;
        const errorMessages = await getErrorMessages(plainToClass(signupPractitionerValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
        const response = await this.practitionerService.signup(postData);
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: "error",
          content: {
            "message": "login failed"
          }
        });
      }
    }

    private async signin(req: Request, res: Response) {
      try {
        const postData: signinPractitionerDTO = req.body;
        const errorMessages = await getErrorMessages(plainToClass(signinPractitionerValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
        const response = await this.practitionerService.signin(postData);
        res.clearCookie('Tolbert-Token');
        res.cookie('Tolbert-Token', response?.token, { httpOnly: true });
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: "error",
          content: {
            "message": "signin failed"
          }
        });
      }
    }

    private async logout(req: Request, res: Response) {
      try {
        res.clearCookie('Tolbert-Token');
        const response = await this.practitionerService.logout();
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: "error",
          content: {
            "message": "login failed"
          }
        });
      }
    }

}