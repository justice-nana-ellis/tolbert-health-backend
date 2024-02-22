
import { SpecialisationRepository } from "../repositories";
import { specialisationResponseDTO, specialisationDTO  } from '../dto'; 

export class SpecialisationService {
    private specialisationRepository: SpecialisationRepository;

    constructor() {
        this.specialisationRepository = new SpecialisationRepository();
    }

    async create(specialisationData: specialisationDTO) {
        try {
            
            const response = await this.specialisationRepository.create(specialisationData);  
            return <specialisationResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
                return <specialisationResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else {
                return <specialisationResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async update(specialisationData: specialisationDTO, id: string) {
        try {
            
            const response = await this.specialisationRepository.update(specialisationData, id);  
            return <specialisationResponseDTO>{ 
                status: 'success',
                content: response
            };
            
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('specialisation')) {
                return <specialisationResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else if(error.code === 'P2025' && error.meta?.modelName?.includes('specialisation')){
                return <specialisationResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
              } else {
                return <specialisationResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
            }
        }
        
    }

    async delete(id: string) {
      try {
        
          await this.specialisationRepository.delete(id);  
          return <specialisationResponseDTO> {
            status: "success",
            content: {
                "message": "Record deleted successfully"
            }
         }
          
      } catch (error: any) {
          console.log(error);
          if (error.code === 'P2002' && error.meta?.modelName?.includes('specialisation')) {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('specialisation')){
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async get() {
      try {

          const response = await this.specialisationRepository.get();  
          return <specialisationResponseDTO>{ 
              status: 'success',
              content: response
          };

      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async getbyId(id: string) {
      try {
          
          const response = await this.specialisationRepository.getbyId(id); 
          if (response === null) {
            let response:[] = []
            return <specialisationResponseDTO>{ 
              status: 'success',
              content: response
          };
          }
          return <specialisationResponseDTO>{ 
              status: 'success',
              content: response
          };
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <specialisationResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }
}