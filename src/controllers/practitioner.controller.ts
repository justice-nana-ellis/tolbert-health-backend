import express, { Request, Response } from 'express';
import { signupPractitionerDTO, signupPractitionerValidationDto, signinPractitionerValidationDto,
         signinPractitionerDTO,  
         updatePractitionerValidationDto} from '../dto'
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
        this.router.get(`${this.BASE_PATH}/practitioner/pending`, this.pending.bind(this));
        this.router.get(`${this.BASE_PATH}/practitioner/search`, this.search.bind(this));
        this.router.get(`${this.BASE_PATH}/practitioner/count`, this.count.bind(this));
        this.router.get(`${this.BASE_PATH}/practitioner/top`, this.top5.bind(this));
        this.router.get(`${this.BASE_PATH}/practitioner/`, this.getAll.bind(this));
        this.router.get(`${this.BASE_PATH}/practitioner/:id`, this.getbyid.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/appointment`, this.appointment.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/:id`, this.update.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/logout/:id`, this.logout.bind(this));
        this.router.delete(`${this.BASE_PATH}/practitioner/delete/:id`, this.delete.bind(this));
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

    private async update(req: Request, res: Response) {
      try {
        const postData = req.body;
        const errorMessages = await getErrorMessages(plainToClass(updatePractitionerValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(200).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
        const response = await this.practitionerService.update (postData, req.params.id); 
        res.status(200).json(response);
      } catch (error) {
        return res.status(200).json({
          status: 'error',
          content: {
            "message": "Internal server error"
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
        res.clearCookie(`${response?.content?.id}`);
        res.cookie(`${response?.content?.id}`, response?.token, { httpOnly: true });
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
        const response: any = await this.practitionerService.logout(req.params.id);
        if(response.status === 'success') {
           res.clearCookie(req.params.id);
        }
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

    private async getAll(req: Request, res: Response) {
      const skip = req?.query?.skip;
      const take = req?.query?.take;
      //@ts-ignore
      const response = await this.practitionerService.getAll(skip, take);
      res.json(response);
    }

    private async search(req: Request, res: Response) {
      //@ts-ignore
      const response = await this.practitionerService.search(req.query.name, req.query.limit);
      res.json(response);
    }

    private async pending(req: Request, res: Response) {
      //@ts-ignore
      const response = await this.practitionerService.pending(req.query.skip, req.query.take);
      res.json(response);
    }

    private async count(req: Request, res: Response) {
      const response = await this.practitionerService.count();
      res.json(response);
    }

    private async top5 (req: Request, res: Response) {
      const response = await this.practitionerService.top5();
      res.json(response);
    }

    private async getbyid(req: Request, res: Response) {
      const response = await this.practitionerService.getbyId(req.params.id);
      res.json(response);
    }

    private async delete(req: Request, res: Response) {
      const response = await this.practitionerService.delete(req.params.id);
      res.json(response);
    }

    private async appointment(req: Request, res: Response) {
      //@ts-ignore
      const response = await this.practitionerService.appointment(req.body.practitionerId, req.body.status, req.query.skip, req.query.take);
      res.status(200).json(response);
    }

}