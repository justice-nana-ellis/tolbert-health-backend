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
exports.ServiceService = void 0;
const repositories_1 = require("../repositories");
class ServiceService {
    constructor() {
        this.serviceRepository = new repositories_1.ServiceRepository();
    }
    create(serviceData) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.serviceRepository.create(serviceData);
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('name'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
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
    update(serviceData, id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.serviceRepository.update(serviceData, id);
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('service'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
                    };
                }
                else if (error.code === 'P2025' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.modelName) === null || _d === void 0 ? void 0 : _d.includes('service'))) {
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
    delete(id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.serviceRepository.delete(id);
                return {
                    status: "success",
                    content: {
                        "message": "Record deleted successfully"
                    }
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('service'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
                    };
                }
                else if (error.code === 'P2025' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.modelName) === null || _d === void 0 ? void 0 : _d.includes('service'))) {
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
    get() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.serviceRepository.get();
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('service'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
                    };
                }
                else if (error.code === 'P2025' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.modelName) === null || _d === void 0 ? void 0 : _d.includes('service'))) {
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
    getbyId(id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.serviceRepository.getbyId(id);
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
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('service'))) {
                    return {
                        status: 'error',
                        content: { message: 'Name already Taken' }
                    };
                }
                else if (error.code === 'P2025' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.modelName) === null || _d === void 0 ? void 0 : _d.includes('service'))) {
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
}
exports.ServiceService = ServiceService;
