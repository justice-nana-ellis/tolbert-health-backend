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
exports.AdminRepository = void 0;
const client_1 = require("@prisma/client");
class AdminRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    signup(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.admin.create({
                //@ts-ignore
                data: adminData
            });
        });
    }
    signin(adminData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.prisma.admin.findUnique({
                    where: {
                        email: adminData.email
                    }
                });
            }
            catch (error) {
            }
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.admin.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.admin.findMany();
        });
    }
    getbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.admin.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    changeStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.practitioner.update({
                where: {
                    id: id
                },
                data: {
                    //@ts-ignore
                    status: status
                }
            });
        });
    }
}
exports.AdminRepository = AdminRepository;
