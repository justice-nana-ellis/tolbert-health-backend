
import { AppointmentRepository, PractitionerRepository, PatientRepository } from "../repositories";
import { appointmentResponseDTO, appointmentDTO  } from '../dto';
import { courierMessage } from "../util"; 

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private practitionerRepository: PractitionerRepository;
    private patientRepository: PatientRepository;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.appointmentRepository = new AppointmentRepository();
        this.practitionerRepository = new PractitionerRepository(); 
        this.patientRepository = new PatientRepository(); 
    }

    async create(appointmentData: appointmentDTO) {
        try {
            const response = await this.appointmentRepository.create(appointmentData);
            //@ts-ignore
            const practitioner = await this.practitionerRepository.getbyId(response.practitioner.id);
            //@ts-ignore
            const patient = await this.patientRepository.getbyId(response?.patientId);
            //console.log("PATIENT",patient);
            
            //@ts-ignore
            if(response) {
                const title = "Appointment Notification"
                const body = `appointment booked with ${practitioner?.full_name}`
                //@ts-ignore
                await courierMessage(response.patientId, title, body);
                // - practitioner 
                const title_ = "Appointment Notification"
                const body_ = `${patient?.full_name} has booked an appointment with you 🩺💊`
                console.log(practitioner?.id);
                //@ts-ignore
                await courierMessage(practitioner?.id, title_, body_);
            }  
            return <appointmentResponseDTO>{ 
                status: 'successs',
                content: response
            }; 
        } catch (error: any) {
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
            } else if(error.code === 'P2025' && error.meta.modelName ==='appointment') {
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

    async get(skip: number, take: number) {
      try {
          const response = await this.appointmentRepository.get (skip, take);  
          const total = await this.appointmentRepository.count ();
          return <appointmentResponseDTO> { 
              status: 'success',
              total: total,
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