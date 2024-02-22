
import { HospitalRepository } from "../repositories";
import { hospitalResponseDTO, hospitalDTO  } from '../dto'; 

export class HospitalService {
    private hospitalRepository: HospitalRepository;

    constructor() {
        this.hospitalRepository = new HospitalRepository();
    }

    async create(hospitalData: hospitalDTO) {
        try {
            
            const response = await this.hospitalRepository.create(hospitalData);  
            return <hospitalResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
                return <hospitalResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else {
                return <hospitalResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async update(hospitalData: hospitalDTO, id: string) {
        try {
            
            const response = await this.hospitalRepository.update(hospitalData, id);  
            return <hospitalResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
                return <hospitalResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
                return <hospitalResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
              } else {
                return <hospitalResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async delete(id: string) {
      try {
        
          await this.hospitalRepository.delete(id);  
          return <hospitalResponseDTO> {
            status: "success",
            content: {
                "message": "Record deleted successfully"
            }
         }
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <hospitalResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <hospitalResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <hospitalResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }
}