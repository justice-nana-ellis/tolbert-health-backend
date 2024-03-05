import express, { Request, Response } from 'express';
import { adminDTO, signinAdminDTO, signupAdminResponseDTO, 
         signinAdminValidationDto, signupAdminValidationDto  } from '../dto'
import { GenericService } from '../services';
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';

export class GenericController {
    public router = express.Router();
    private genericService : GenericService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.genericService = new GenericService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.BASE_PATH}/admin`, this.get.bind(this));
        // this.router.get(`${this.BASE_PATH}/admin/total`, this.total.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/signup`, this.signup.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/signin`, this.signin.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/logout/:id`, this.logout.bind(this));
        // this.router.post(`${this.BASE_PATH}/admin/status/:id`, this.changeStatus.bind(this));
        this.router.get(`${this.BASE_PATH}/otp/verify`, this.verify.bind(this));
    }

    private async verify(req: Request, res: Response) {
      try {
        //const errorMessages = await getErrorMessages(plainToClass(signinAdminValidationDto, req.body));
        // if (errorMessages.length > 0) return res.status(400).json({
        //   status: 'error',
        //   content: { message: errorMessages }, 
        //   timestamp: timestamp,
        // });
        //@ts-ignore
        const response = await this.genericService.verify(req.query.email, req.query.otp);
        //res.clearCookie(`${response?.content?.id}`);
        //@ts-ignore
        //res.cookie(`${response?.content?.id}`, response?.token, { httpOnly: true });
        if(response.status === 'success' ) return res.redirect('https://www.google.com/')
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

    // private async logout(req: Request, res: Response) {
    //   try {
    //     const response: any = await this.adminService.logout(req.params.id);
    //     res.json(response);
    //   } catch (error) {
    //     return res.status(500).json({
    //       status: "error",
    //       content: {
    //         "message": "login failed"
    //       }
    //     });
    //   }
    // }



}