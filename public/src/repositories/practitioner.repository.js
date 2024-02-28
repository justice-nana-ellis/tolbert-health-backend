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
exports.PractitionerRepository = void 0;
const client_1 = require("@prisma/client");
class PractitionerRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    signup(practitionerData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.create({
                //@ts-ignore
                data: practitionerData
            });
        });
    }
    signin(patientData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.prisma.practitioner.findUnique({
                    where: {
                        email: patientData.email
                    }
                });
            }
            catch (error) {
            }
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    getallPractitioners(skipped, taken) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = Number(skipped);
            const take = Number(taken);
            return this.prisma.practitioner.findMany({
                skip,
                //@ts-ignore
                take,
                select: {
                    //@ts-ignore
                    id: true,
                    full_name: true,
                    dob: true,
                    pob: true,
                    img_url: true,
                    digital_address: true,
                    contact: true,
                    status: true,
                    id_number: true,
                    licence_number: true,
                    hospitals: true,
                    specialisations: true,
                    password: false,
                }
            });
        });
    }
    getRandomPractitioners(count) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.findMany({
                take: count,
                select: {
                    id: true,
                    full_name: true,
                    img_url: true
                },
                orderBy: {
                    //@ts-ignore
                    _random: true
                }
            });
        });
    }
    findPractitionersByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.findMany({
                where: {
                    full_name: {
                        contains: name
                    }
                },
                select: {
                    id: true,
                    full_name: true,
                    img_url: true
                }
            });
        });
    }
    docInfo(practitioner) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.findUnique({
                //@ts-ignore
                where: {
                    //@ts-ignore
                    full_name: practitioner[0]
                },
                select: {
                    id: true,
                    full_name: true,
                    img_url: true
                }
            });
        });
    }
    hospitalExists(hospitals) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.findMany({
                where: {
                    id: {
                        in: hospitals,
                    },
                },
                select: {
                    id: true,
                },
            });
        });
    }
    specialisationExists(specialisations) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.specialisation.findMany({
                where: {
                    id: {
                        in: specialisations,
                    },
                },
                select: {
                    id: true,
                },
            });
        });
    }
}
exports.PractitionerRepository = PractitionerRepository;
