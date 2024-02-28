
import bcrypt from 'bcrypt';
import Fuse from 'fuse.js';
import jwt from 'jsonwebtoken';
import { PractitionerRepository } from "../repositories";
import { signupPractitionerDTO, signupPractitionerResponseDTO, logoutPractitionerResponseDTO,
         signinPractitionerDTO, signinPractitionerResponseDTO  } from '../dto'; 

export class PractitionerService {
    private practitionerRepository: PractitionerRepository;
    private readonly SECRET_KEY = <string>process.env.SECRET_KEY

    constructor() {
        this.practitionerRepository = new PractitionerRepository();
    }

    async signup(practitionerData: signupPractitionerDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(practitionerData.password, salt);
            const practitioner = {
                ...practitionerData,
                password: hash,
                verified: false,
                status: 'pending'
            }
            const response: any = await this.practitionerRepository.signup(patient);    
            delete response.password;

            const hospitalExists = await this.practitionerRepository.hospitalExists(practitionerData.hospitals);
            const specialisationExists = await this.practitionerRepository.specialisationExists(practitionerData.specialisations);
            
            if (hospitalExists.length !== practitionerData.hospitals.length) {
                return <signupPractitionerResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Invalid hospital IDs provided' }
                };
            }
            if (specialisationExists.length !== practitionerData.specialisations.length) {
                return <signupPractitionerResponseDTO>{ 
                    status: 'error',
                    content: { message: 'Invalid specialistion IDs provided' }
                };
            }
            const response: any = await this.practitionerRepository.signup(practitioner);    
            return <signupPractitionerResponseDTO>{ 
                status: 'success',
                content:  response
            };
            
        } catch (error: any) {
            console.log(error);
            
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupPractitionerResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupPractitionerResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async signin(patientData: signinPractitionerDTO) {
        try {
            const response: any = await this.practitionerRepository.signin(patientData); 
            if(response === null) { 
                return <signinPractitionerResponseDTO>{
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
                return <signinPractitionerResponseDTO>{
                    status: "success",
                    content: response,
                    token: Token
                };
            } else {
                return <signinPractitionerResponseDTO>{
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
            const response = await this.practitionerRepository.logout(id);
            if (response === null) {
                return <logoutPractitionerResponseDTO> {
                    status: "error",
                    content: {
                        "message": "Record not found"
                    }
                }
            }
            return <logoutPractitionerResponseDTO> {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            }
        } catch (error: any) {
            
        }
    }

    async getAll(skip: number, take: number) {
        try {
            const response = await this.practitionerRepository.getallPractitioners(skip, take);
            response.forEach(obj => {
                //@ts-ignore
                delete obj.password;
              });
            return <signinPractitionerResponseDTO>{
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