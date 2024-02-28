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
exports.HospitalRepository = void 0;
const client_1 = require("@prisma/client");
class HospitalRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(hospitalData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.create({
                data: hospitalData
            });
        });
    }
    update(hospitalData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.update({
                where: {
                    id: id
                }, data: {
                    name: hospitalData.name
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.delete({
                where: {
                    id: id
                }
            });
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.findMany();
        });
    }
    getbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.hospital.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
}
exports.HospitalRepository = HospitalRepository;
