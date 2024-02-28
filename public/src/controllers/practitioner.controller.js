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
exports.PractitionerController = void 0;
const express_1 = __importDefault(require("express"));
const dto_1 = require("../dto");
const practitioner_service_1 = require("../services/practitioner.service");
const util_1 = require("../util");
const class_transformer_1 = require("class-transformer");
const timestamp = new Date().toISOString();
class PractitionerController {
    constructor() {
        this.router = express_1.default.Router();
        this.BASE_PATH = process.env.BASE_PATH;
        this.practitionerService = new practitioner_service_1.PractitionerService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.BASE_PATH}/practitioner/search`, this.getAll.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/signup`, this.signup.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/signin`, this.signin.bind(this));
        this.router.post(`${this.BASE_PATH}/practitioner/logout/:id`, this.logout.bind(this));
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const errorMessages = yield (0, util_1.getErrorMessages)((0, class_transformer_1.plainToClass)(dto_1.signupPractitionerValidationDto, req.body));
                if (errorMessages.length > 0)
                    return res.status(400).json({
                        status: 'error',
                        content: { message: errorMessages },
                        timestamp: timestamp,
                    });
                const response = yield this.practitionerService.signup(postData);
                res.json(response);
            }
            catch (error) {
                return res.status(500).json({
                    status: "error",
                    content: {
                        "message": "login failed"
                    }
                });
            }
        });
    }
    signin(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const errorMessages = yield (0, util_1.getErrorMessages)((0, class_transformer_1.plainToClass)(dto_1.signinPractitionerValidationDto, req.body));
                if (errorMessages.length > 0)
                    return res.status(400).json({
                        status: 'error',
                        content: { message: errorMessages },
                        timestamp: timestamp,
                    });
                const response = yield this.practitionerService.signin(postData);
                res.clearCookie(`${(_a = response === null || response === void 0 ? void 0 : response.content) === null || _a === void 0 ? void 0 : _a.id}`);
                res.cookie(`${(_b = response === null || response === void 0 ? void 0 : response.content) === null || _b === void 0 ? void 0 : _b.id}`, response === null || response === void 0 ? void 0 : response.token, { httpOnly: true });
                res.json(response);
            }
            catch (error) {
                return res.status(500).json({
                    status: "error",
                    content: {
                        "message": "signin failed"
                    }
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.practitionerService.logout(req.params.id);
                if (response.status === 'success') {
                    res.clearCookie(req.params.id);
                }
                res.json(response);
            }
            catch (error) {
                return res.status(500).json({
                    status: "error",
                    content: {
                        "message": "login failed"
                    }
                });
            }
        });
    }
    getAll(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.skip;
            const take = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.take;
            //@ts-ignore
            const response = yield this.practitionerService.getAll(skip, take);
            res.json(response);
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const { name } = req.query.name;
            //@ts-ignore
            const response = yield this.practitionerService.search(req.query.name);
            res.json(response);
        });
    }
}
exports.PractitionerController = PractitionerController;
