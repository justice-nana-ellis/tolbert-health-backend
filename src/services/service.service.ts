
import { ServiceRepository } from "../repositories";
import { serviceResponseDTO, serviceDTO  } from '../dto'; 
import { errorHandler } from "../util";

export class ServiceService {
    private serviceRepository: ServiceRepository;

    constructor() {
        this.serviceRepository = new ServiceRepository();
    }

    async create(serviceData: serviceDTO) {
        try {
          const practitionerExistence = await this.serviceRepository.findPractitioner(serviceData.practitionerId);
          if (practitionerExistence === null) {
            return <serviceResponseDTO> { 
              status: 'error',
              code: 606,
              content: {
                "message": "Practitioner not found"
              }
            }
          }
          const response = await this.serviceRepository.create(serviceData);  
          return <serviceResponseDTO> { 
              status: 'success',
              content: response
          };
        } catch (error: any) {
          return <serviceResponseDTO>{ 
            status: 'error',
            content: { message: 'Internal server error' } 
          };
        }
        
    }

    async update(serviceData: serviceDTO, id: string) {
        try {
          const practitionerExistence = await this.serviceRepository.findPractitioner(serviceData.practitionerId);
          if (practitionerExistence === null) {
            return <serviceResponseDTO> { 
              status: 'error',
              code: 606,
              content: {
                "message": "Practitioner not found"
              }
            }
          }
            const response = await this.serviceRepository.update(serviceData, id);  
            return <serviceResponseDTO>{ 
                status: 'success',
                content: response
            };
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('service')) {
                return <serviceResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
              } else if(error.code === 'P2025' && error.meta?.modelName?.includes('service')){
                return <serviceResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
              } else {
                return <serviceResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async delete(id: string) {
      try {
        
          await this.serviceRepository.delete(id);  
          return <serviceResponseDTO> {
            status: "success",
            content: {
                "message": "Record deleted successfully"
            }
         }
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('service')) {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('service')){
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async get(skip: number, take: number) {
      try {
          const response = await this.serviceRepository.get(skip, take); 
          const total = await this.serviceRepository.count (); 
          return <serviceResponseDTO> { 
              status: 'success',
              total: total,
              content: response
          };

      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('service')) {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('service')){
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async getbyId(id: string) {
      try {
          
          const response = await this.serviceRepository.getbyId(id);  
          if (response === null) {
            let response:[] = []
            return <serviceResponseDTO>{ 
              status: 'success',
              content: response
          };
          }
          return <serviceResponseDTO>{ 
              status: 'success',
              content: response
          };
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('service')) {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('service')){
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
    }

    async getPractitionerService(practitionerId: string) {
      try {
          const practitionerExistence = await this.serviceRepository.findPractitioner(practitionerId);
          if (practitionerExistence === null) {
            return <serviceResponseDTO> { 
              status: 'error',
              code: 606,
              content: {
                "message": "Record not found"
              }
            }
          }
          const response = await this.serviceRepository.getPractitionerServices(practitionerId);  
          if (response === null) {
            let response:[] = []
            return <serviceResponseDTO>{ 
              status: 'success',
              content: response
          };
          }
          return <serviceResponseDTO> { 
              status: 'success',
              content: response
          };
      } catch (error: any) {
        console.log(error);
        
           if(error.code === 'P2025' && error.meta?.modelName?.includes('service')){
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <serviceResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }
}