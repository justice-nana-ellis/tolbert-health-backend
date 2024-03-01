
import express, { Request, Response } from 'express';
import { signupPatientDTO, signinPatientDTO, signupPatientValidationDto,
         signinPatientValidationDto  } from '../dto';
import { plainToClass } from 'class-transformer';
import { PatientService } from '../services';
import { getErrorMessages } from '../util'; 

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
        this.router.get(`${this.BASE_PATH}/patient/search`, this.search.bind(this));
        this.router.get(`${this.BASE_PATH}/patient/count`, this.count.bind(this));
        this.router.get(`${this.BASE_PATH}/patient`, this.getAll.bind(this));
        this.router.get(`${this.BASE_PATH}/patient/:id`, this.getbyId.bind(this));
        this.router.post(`${this.BASE_PATH}/patient/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/patient/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/patient/logout/:id`, this.logout.bind(this));
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
        res.clearCookie(`${response?.content?.id}`);
        res.cookie(`${response?.content?.id}`, response?.token, { httpOnly: true });
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
        const response: any = await this.patientService.logout(req.params.id);
        if(response.status === 'success') {
           res.clearCookie(req.params.id);
        } 
        res.json(response);
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          content: 'login failed' 
        });
      }
    }

    private async getAll(req: Request, res: Response) {
      const skip = req?.query?.skip;
      const take = req?.query?.take;

      //@ts-ignore
      const response = await this.patientService.getAll(skip, take);
      res.json(response);
    }

    private async search(req: Request, res: Response) {
      //@ts-ignore
      const response = await this.patientService.search(req.query.name, req.query.limit);
      res.json(response);
    }

    private async count(req: Request, res: Response) {
      const response = await this.patientService.count();
      res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
      const response = await this.patientService.getbyId(req.params.id);
      res.json(response);
    }

}

