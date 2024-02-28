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
exports.disconnect = exports.db = exports.seed = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient;
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.db)();
        const admin = yield prisma.patient.create({
            data: {
                id: 'c828301b-2d77-440f-9ca6-396fb679d9d1',
                full_name: 'Admin',
                password: 'password',
                email: 'admin@example.com'
            },
        });
        console.log('Seeded admin: ', admin);
    }
    catch (ex) {
        console.error('Error during seeding: ', ex);
        throw ex;
    }
    finally {
        yield (0, exports.disconnect)();
    }
});
exports.seed = seed;
const db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log('🔌 Database connected..');
    }
    catch (ex) {
        console.log('Error connecting to Database: ', ex);
    }
});
exports.db = db;
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$disconnect();
        console.log('🔌 Database Disconnected..');
    }
    catch (ex) {
        console.log('Error disconnecting Database: ', ex);
    }
});
exports.disconnect = disconnect;
