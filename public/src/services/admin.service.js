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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("../repositories");
class AdminService {
    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY;
        this.adminRepository = new repositories_1.AdminRepository();
    }
    signup(adminData) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(adminData.password, salt);
                const admin = Object.assign(Object.assign({}, adminData), { password: hash });
                const response = yield this.adminRepository.signup(admin);
                delete response.password;
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
                    return {
                        status: 'error',
                        content: { message: 'Email already Taken' }
                    };
                }
                else {
                    return {
                        status: 'error',
                        content: { message: 'Internal server error' }
                    };
                }
            }
        });
    }
    signin(patientData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminRepository.signin(patientData);
                if (response === null) {
                    return {
                        status: "error",
                        content: {
                            "message": "invalid credentials"
                        }
                    };
                }
                const match = yield bcrypt_1.default.compare(patientData.password, response.password);
                if (match) {
                    //-- jwt
                    const payload = {
                        "iss": `TOLBERT_HEALTH_SERVICE`,
                        "id": `${response === null || response === void 0 ? void 0 : response.id}`,
                        "email": `${response === null || response === void 0 ? void 0 : response.email}`,
                        "full_name": `${response === null || response === void 0 ? void 0 : response.email}`,
                        "access_level": `${response === null || response === void 0 ? void 0 : response.access_level}`
                    };
                    const Token = jsonwebtoken_1.default.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
                    delete response.password;
                    return {
                        status: "success",
                        content: response,
                        token: Token
                    };
                }
                else {
                    return {
                        status: "error",
                        content: {
                            "message": "invalid credentials"
                        }
                    };
                }
            }
            catch (error) {
            }
        });
    }
    logout(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminRepository.logout(id);
                if (response === null) {
                    return {
                        status: "error",
                        content: {
                            "message": "Record not found"
                        }
                    };
                }
                return {
                    status: "success",
                    content: {
                        "message": "logged out successfully"
                    }
                };
            }
            catch (error) {
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminRepository.get();
                //@ts-ignore
                response.forEach(obj => {
                    //@ts-ignore
                    delete obj.password;
                });
                return {
                    status: "success",
                    content: response
                };
            }
            catch (error) {
            }
        });
    }
    getbyId(id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminRepository.getbyId(id);
                if (response === null) {
                    let response = [];
                    return {
                        status: 'success',
                        content: response
                    };
                }
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('admin'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
                    };
                }
                else if (error.code === 'P2025' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.modelName) === null || _d === void 0 ? void 0 : _d.includes('hospital'))) {
                    return {
                        status: 'error',
                        content: { message: 'Record not found' }
                    };
                }
                else {
                    return {
                        status: 'error',
                        content: { message: 'Internal server error' }
                    };
                }
            }
        });
    }
    changeStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminRepository.changeStatus(id, status);
                //@ts-ignore
                delete response.password;
                return {
                    status: "success",
                    content: response
                };
            }
            catch (error) {
            }
        });
    }
}
exports.AdminService = AdminService;
