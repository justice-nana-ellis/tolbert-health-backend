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
exports.ServiceController = void 0;
const express_1 = __importDefault(require("express"));
const dto_1 = require("../dto");
const class_transformer_1 = require("class-transformer");
const services_1 = require("../services");
const util_1 = require("../util");
const timestamp = new Date().toISOString();
class ServiceController {
    constructor() {
        this.router = express_1.default.Router();
        this.BASE_PATH = process.env.BASE_PATH;
        this.serviceService = new services_1.ServiceService();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.BASE_PATH}/service`, this.create.bind(this));
        this.router.patch(`${this.BASE_PATH}/service/:id`, this.update.bind(this));
        this.router.delete(`${this.BASE_PATH}/service/:id`, this.delete.bind(this));
        this.router.get(`${this.BASE_PATH}/service`, this.get.bind(this));
        this.router.get(`${this.BASE_PATH}/service/:id`, this.getbyId.bind(this));
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            const errorMessages = yield (0, util_1.getErrorMessages)((0, class_transformer_1.plainToClass)(dto_1.serviceValidationDto, req.body));
            if (errorMessages.length > 0)
                return res.status(400).json({
                    status: 'error',
                    content: { message: errorMessages },
                    timestamp: timestamp,
                });
            const response = yield this.serviceService.create(postData);
            res.json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            const errorMessages = yield (0, util_1.getErrorMessages)((0, class_transformer_1.plainToClass)(dto_1.serviceValidationDto, req.body));
            if (errorMessages.length > 0)
                return res.status(400).json({
                    status: 'error',
                    content: { message: errorMessages },
                    timestamp: timestamp,
                });
            const response = yield this.serviceService.update(postData, req.params.id);
            res.json(response);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceService.delete(req.params.id);
            res.json(response);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceService.get();
            res.json(response);
        });
    }
    getbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.serviceService.getbyId(req.params.id);
            res.json(response);
        });
    }
}
exports.ServiceController = ServiceController;
