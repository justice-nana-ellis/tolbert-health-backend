import express, { Request, Response } from 'express';
import { adminDTO, signinAdminDTO, signupAdminResponseDTO, 
         signinAdminValidationDto, signupAdminValidationDto  } from '../dto'
import { AdminService } from '../services';
import { getErrorMessages } from '../util'; 
import { plainToClass } from 'class-transformer';

const timestamp = new Date().toISOString();

export class AdminController {
    public router = express.Router();
    private adminService: AdminService;
    private readonly BASE_PATH = <string>process.env.BASE_PATH

    constructor() {
        this.adminService = new AdminService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.BASE_PATH}/admin`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/admin/total`, this.total.bind(this));
        this.router.post(`${this.BASE_PATH}/admin/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/admin/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/admin/logout/:id`, this.logout.bind(this));
        this.router.patch(`${this.BASE_PATH}/admin/:id`, this.update.bind(this));
        this.router.post(`${this.BASE_PATH}/admin/status/:id`, this.changeStatus.bind(this));
        this.router.post(`${this.BASE_PATH}/admin/signup`, this.signup.bind(this));
    }
  
    private async signup(req: Request, res: Response) {
      try {
        const postData = req.body;
        const errorMessages = await getErrorMessages(plainToClass(signupAdminValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
        const response = await this.adminService.signup(postData);
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
        const postData: signinAdminDTO = req.body;
        const errorMessages = await getErrorMessages(plainToClass(signinAdminValidationDto, req.body));
        if (errorMessages.length > 0) return res.status(400).json({
          status: 'error',
          content: { message: errorMessages }, 
          timestamp: timestamp,
        });
        const response = await this.adminService.signin(postData);
        res.clearCookie(`${response?.content?.id}`);
        //@ts-ignore
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

    private async update(req: Request, res: Response) {
      const response = await this.adminService.update(req.body, req.params.id);
      res.json(response);
    }

    private async logout(req: Request, res: Response) {
      try {
        const response: any = await this.adminService.logout(req.params.id);
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

    private async changeStatus(req: Request, res: Response) {
        const response = await this.adminService.changeStatus(req.params.id, req.body.status);
        res.json(response);
    }

    private async get(req: Request, res: Response) {
        //@ts-ignore
        const response = await this.adminService.get(req.query.skip, req.query.take);
        res.json(response);
    }

    private async getbyId(req: Request, res: Response) {
        const response = await this.adminService.getbyId(req.params.id);
        res.json(response);
    }

    private async total(req: Request, res: Response) {
      const response = await this.adminService.total();
      res.json(response);
  }

}