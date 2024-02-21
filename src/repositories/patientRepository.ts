
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { signupPatientDTO, signupPatientResponseDTO, signinPatientDTO  } from "../dto/patient.dto"

export class PatientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(patientData: signupPatientDTO) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(patientData.password, salt);
            const patient = {
                ...patientData,
                password: hash,
                verified: false
            }
            const response = await this.prisma.patient.create({
                data: patient
            })
            return <signupPatientResponseDTO>{ 
                status: 'success',
                content: response
              };
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return <signupPatientResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Email already Taken' }
                };
              } else {
                return <signupPatientResponseDTO>{ 
                  status: 'error',
                  content: { message: 'Internal server error' } 
                };
              }
        }
        
    }

    async signin(patientData: signinPatientDTO) {
        try {
            
            return this.prisma.patient.findUnique({
                where: {
                    email: patientData.email
                }
            });
            // console.log(res);
            // return res
            // return <signupPatientResponseDTO>{ 
            //     status: 'success',
            //     content: response
            //   };
        } catch (error: any) {
            
            // if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            //     return <signupPatientResponseDTO>{ 
            //       status: 'error',
            //       content: { message: 'Email already Taken' }
            //     };
            //   } else {
            //     return <signupPatientResponseDTO>{ 
            //       status: 'error',
            //       content: { message: 'Internal server error' } 
            //     };
            //   }
        }
        
    }

    async updatePatient() {

    }
}