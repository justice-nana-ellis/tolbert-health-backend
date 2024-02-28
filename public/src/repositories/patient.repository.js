"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRepository = void 0;
const client_1 = require("@prisma/client");
class PatientRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    signup(patientData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.patient.create({
                data: patientData
            });
        });
    }
    signin(patientData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.patient.findUnique({
                where: {
                    email: patientData.email
                }
            });
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.patient.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    getallPatients(skipped, taken) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = Number(skipped);
            const take = Number(taken);
            return this.prisma.patient.findMany({
                skip,
                //@ts-ignore
                take,
                select: {
                    //@ts-ignore
                    id: true,
                    full_name: true,
                    email: true
                }
            });
        });
    }
}
exports.PatientRepository = PatientRepository;
