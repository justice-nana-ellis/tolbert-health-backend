
import { PrismaClient } from "@prisma/client";
import { RegisterPatientDTO } from "../dto/patient.dto"

export class PatientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signup(patientData: RegisterPatientDTO) {
        return await this.prisma.patient.create({
            data: patientData
        })
    }

    async updatePatient() {

    }
}