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
exports.PatientService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const patient_repository_1 = require("../repositories/patient.repository");
class PatientService {
    constructor() {
        this.SECRET_KEY = process.env.SECRET_KEY;
        this.patientRepository = new patient_repository_1.PatientRepository();
    }
    signup(patientData) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(patientData.password, salt);
                const patient = Object.assign(Object.assign({}, patientData), { password: hash, verified: false });
                const response = yield this.patientRepository.signup(patient);
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
                const response = yield this.patientRepository.signin(patientData);
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
                    const payload = Object.assign({ "iss": `TOLBERT_HEALTH_SERVICE` }, response);
                    const Token = jsonwebtoken_1.default.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
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
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: "success",
                content: {
                    "message": "logged out successfully"
                }
            };
        });
    }
}
exports.PatientService = PatientService;
