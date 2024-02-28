
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminRepository } from "../repositories";
import { signupAdminDTO, signinAdminResponseDTO, logoutAdminResponseDTO,
         signupAdminResponseDTO, adminDTO, signinAdminDTO  } from '../dto'; 

export class AdminService {
    private adminRepository: AdminRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async signup(adminData: signupAdminDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(adminData.password, salt);
            const admin = {
                ...adminData,
                password: hash,
            }
            const response: any = await this.adminRepository.signup(admin);    
            delete response.password;
            return <signupAdminResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupAdminResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupAdminResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async signin(patientData: signinAdminDTO) {
        try {
            const response: any = await this.adminRepository.signin(patientData); 
            if(response === null) { 
                return <signinAdminResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            }
           
            const match = await bcrypt.compare(patientData.password, response.password)
            if(match) {
                //-- jwt
                const payload = {
                    "iss": `TOLBERT_HEALTH_SERVICE`,
                    "id": `${response?.id}`,
                    "email": `${response?.email}`,
                    "full_name": `${response?.email}`,
                    "access_level": `${response?.access_level}` 
                }
                const Token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                delete response.password;
                return <signupAdminResponseDTO>{
                    status: "success",
                    content: response,
                    token: Token
                };
            } else {
                return <signupAdminResponseDTO>{
                    status: "error",
                    content: {
                        "message": "invalid credentials"
                    }
                };
            }
        } catch (error) {
            
        }
    }

    async logout(id: string) {
        try {
            const response = await this.adminRepository.logout(id);
            if (response === null) {
                return <logoutAdminResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                }
            }
            return <logoutAdminResponseDTO> {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            }
        } catch (error: any) {
            
        }
    }

    async get() {
        try {
            const response = await this.adminRepository.get();
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <signinAdminResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }

    async getbyId(id: string) {
        try {
            
            const response = await this.adminRepository.getbyId(id);  
            if (response === null) {
              let response:[] = []
              return <adminDTO>{ 
                status: 'success',
                content: response
            };
            }
            return <adminDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('admin')) {
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
              } else {
                return <adminDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async changeStatus(id: string, status: string) {
        try {
            const response = await this.adminRepository.changeStatus(id, status);
            //@ts-ignore
            delete response.password;
            return <signinAdminResponseDTO>{
                status: "success",
                content: response
            };
        } catch (error: any) {
            
        }
    }

    // async search(name: string) {
    //     try {
            
    //         console.log(name === `yes`);
            
    //         //console.log( "RANDOM",await this.practitionerRepository.getRandomPractitioners(10));
    //         if(name) {
    //             const response = await this.practitionerRepository.getRandomPractitioners(10);
    //             console.log(name);
    //             console.log("heey!!!!");
    //             return <signinPractitionerResponseDTO>{
    //                 status: "success",
    //                 content: response
    //             };
                
    //         }
    //         const practitioners = await this.practitionerRepository.findPractitionersByName(name);
    //         const options = {
    //             keys: ['full_name'], 
    //             includeScore: true 
    //         };

    //         const fuse = new Fuse(practitioners, options);
    //         const searchResults = fuse.search(name.toString());
    //         const similarPractitioners = searchResults.map((result: any) => ({
    //             id: result.item.id,
    //             full_name: result.item.full_name,
    //             img_url: result.item.img_url
    //         }));
    //         //console.log(similarPractitioners)
    //         return <signinPractitionerResponseDTO>{
    //             status: "success",
    //             content: similarPractitioners
    //         };

    //     } catch (error: any) {
            
    //     }
    // }
}