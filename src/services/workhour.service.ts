
import { ServiceRepository, WorkHourRepository } from "../repositories";
import { createWorkHourDTO, workHourResponseDTO  } from '../dto'; 

export class WorkHourService {
    private workHourRepository: WorkHourRepository;
    private serviceRepository: ServiceRepository;

    constructor() {
        this.workHourRepository = new WorkHourRepository();
        this.serviceRepository = new ServiceRepository();
    }

    async create(workhourData: createWorkHourDTO) {
        try {
          const practitionerExistence = await this.serviceRepository.findPractitioner(workhourData.practitionerId);
          if (practitionerExistence === null) {
            return <workHourResponseDTO> { 
              status: 'error',
              code: 606,
              content: {
                "message": "Practitioner not found"
              }
            }
          }
          await this.workHourRepository.create(workhourData);  
          return <workHourResponseDTO> { 
              status: 'success',
              code: 555,
              content: {
                "message": "Workhours created successfully"
              }
          };
        } catch (error: any) {
          return <workHourResponseDTO>{ 
            status: 'error',
            content: { message: 'Internal server error' } 
          };
        }
    }

    async update(workhourData: createWorkHourDTO, id: string) {
        try {
            const practitionerExistence = await this.serviceRepository.findPractitioner(workhourData.practitionerId);
            if (practitionerExistence === null) {
                return <workHourResponseDTO> { 
                    status: 'error',
                    code: 606,
                    content: {
                        "message": "Practitioner not found"
                    }
                }
            }
            await this.workHourRepository.update(workhourData, id);  
            return <workHourResponseDTO> { 
                status: 'success',
                code: 555,
                content: {
                    "message": "Workhours updated successfully"
                }
            };
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.modelName?.includes('workhours')) {
                return <workHourResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Name already Taken' }
                };
            } else if (error.code === 'P2025' && error.meta?.modelName?.includes('workhours')) {
                return <workHourResponseDTO> { 
                  status: 'error',
                  content: { message: 'Record not found' }
                };
            } else {
                return <workHourResponseDTO> { 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
            }
        }
        
    }

    async delete(id: string) {
      try {
          await this.workHourRepository.delete(id);  
          return <workHourResponseDTO> {
            status: "success",
            code: 999,
            content: {
                "message": "Record deleted successfully"
            }
         }
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('workhours')) {
              return <workHourResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('workhours')){
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async get(skip: number, take: number) {
      try {
          const response = await this.workHourRepository.get(skip, take); 
          //const total = await this.workHourRepository.count (); 
          return <workHourResponseDTO> { 
              status: 'success',
              //total: total,
              content: response
          };

      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('workhours')) {
              return <workHourResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('workhours')){
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async getbyId(id: string) {
      try {
          const response = await this.workHourRepository.getbyId(id);  
          if (response === null) {
            let response:[] = []
            return <workHourResponseDTO>{ 
              status: 'success',
              content: response
          };
          }
          return <workHourResponseDTO>{ 
              status: 'success',
              content: response
          };
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('workhours')) {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
          } else if(error.code === 'P2025' && error.meta?.modelName?.includes('workhours')) {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Record not found' }
              };
          } else {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
          }
      }
    }

    async getPractitionerWorkhours(practitionerId: string) {
      try {
          const practitionerExistence = await this.workHourRepository.getpractitionerWorkhours(practitionerId);
          if (practitionerExistence === null) {
            return <workHourResponseDTO> { 
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
                return <workHourResponseDTO> { 
                    status: 'success',
                    content: response
                };
            }
            return <workHourResponseDTO> { 
                status: 'success',
                content: response
            };
      } catch (error: any) {
           if (error.code === 'P2025' && error.meta?.modelName?.includes('workhours')){
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <workHourResponseDTO> { 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
    }
}