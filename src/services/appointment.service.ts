
import { AppointmentRepository } from "../repositories";
import { appointmentResponseDTO, appointmentDTO  } from '../dto'; 

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
    }

    async create(appointmentData: appointmentDTO) {
        try {
            const response = await this.appointmentRepository.create(appointmentData);  
            return <appointmentResponseDTO>{ 
                status: 'successs',
                content: response
            };
            
        } catch (error: any) {
            console.log(error);
            if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
                return <appointmentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Title already Taken' }
                };
              } else if (error.code === 'P2025' && error.meta?.modelName?.includes('appointment') && error.meta?.cause?.includes('appointmentToservice')) {
                return <appointmentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Service not found' }
                };
              } else if (error.code === 'P2025' && error.meta?.modelName?.includes('appointment') && error.meta?.cause?.includes('appointmentTopatient')) {
                return <appointmentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Patient not found' }
                };
              } else if (error.code === 'P2025' && error.meta?.modelName?.includes('appointment') && error.meta?.cause?.includes('appointmentTopractitioner')) {
                return <appointmentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Practitioner not found' }
                };
              } else {
                return <appointmentResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async update(appointmentData: appointmentDTO, id: string) {
        try {
            const response = await this.appointmentRepository.update(appointmentData, id);  
            return <appointmentResponseDTO>{ 
                status: 'success',
                content: response
            };
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('title')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Title already Taken' }
              };
            } else if(error.code === 'P2003' && error.meta?.field_name?.includes('appointment_patientId_fkey')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Patient not found' }
              };
            } else if(error.code === 'P2003' && error.meta?.field_name?.includes('appointment_practitionerId_fkey')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Practitioner not found' }
              };
            } else if(error.code === 'P2025' && error.meta?.cause?.includes('Record to update not found')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
        }
        
    }

    async delete(id: string) {
      try {
        
          await this.appointmentRepository.delete(id);  
          return <appointmentResponseDTO> {
            status: "success",
            content: {
                "message": "Record deleted successfully"
            }
         }
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async get() {
      try {

          const response = await this.appointmentRepository.get();  
          return <appointmentResponseDTO>{ 
              status: 'success',
              content: response
          };

      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }

    async getbyId(id: string) {
      try {
          
          const response = await this.appointmentRepository.getbyId(id);  
          if (response === null) {
            let response:[] = []
            return <appointmentResponseDTO>{ 
              status: 'success',
              content: response
          };
          }
          return <appointmentResponseDTO>{ 
              status: 'success',
              content: response
          };
          
      } catch (error: any) {
          if (error.code === 'P2002' && error.meta?.modelName?.includes('hospital')) {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Name already Taken' }
              };
            } else if(error.code === 'P2025' && error.meta?.modelName?.includes('hospital')){
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Record not found' }
              };
            } else {
              return <appointmentResponseDTO>{ 
                status: 'error',
                content: { message: 'Internal server error' } 
              };
            }
      }
      
    }
}