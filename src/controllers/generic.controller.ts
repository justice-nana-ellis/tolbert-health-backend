import express, { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { genericValidationDto } from '../dto'
import { GenericService } from '../services';
import { getErrorMessages } from '../util'; 

const timestamp = new Date().toISOString();

export class GenericController {
    public router = express.Router ();
    private genericService : GenericService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor () {
        this.genericService = new GenericService ();
        this.initializeRoutes ();
    }

    private initializeRoutes() {
        // this.router.get(`${this.BASE_PATH}/admin`, this.get.bind(this));
        // this.router.get(`${this.BASE_PATH}/admin/total`, this.total.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/signup`, this.signup.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/signin`, this.signin.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/logout/:id`, this.logout.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/status/:id`, this.changeStatus.bind(this));
        this.router.post(`${this.BASE_PATH}/otp/verify`, this.verify.bind(this));
    }

    private async verify(req: Request, res: Response) {
      try {
        const errorMessages = await getErrorMessages(plainToClass(genericValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(200).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
    
        const response = await this.genericService.verify(req.body.email, req.body.otp);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(200).json({
          status: "error",
          content: {
            "message": "Email verification failed"
          }
        });
      }
    }

    

}