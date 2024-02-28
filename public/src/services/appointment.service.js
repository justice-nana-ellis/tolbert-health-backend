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
exports.AppointmentService = void 0;
const repositories_1 = require("../repositories");
class AppointmentService {
    constructor() {
        this.appointmentRepository = new repositories_1.AppointmentRepository();
    }
    create(appointmentData) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                // const findDoc = await this.appointmentRepository.findDoc(appointmentData.practitionerId);  
                // console.log(findDoc)
                // if(findDoc === null) {
                //     return <appointmentResponseDTO>{ 
                //         status: 'error',
                //         content: { message: 'Practitioner not Found' }
                //       };
                // }
                const response = yield this.appointmentRepository.create(appointmentData);
                return {
                    status: 'successs',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('title'))) {
                    return {
                        status: 'error',
                        content: { message: 'Title already Taken' }
                    };
                }
                else if (error.code === 'P2003' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.field_name) === null || _d === void 0 ? void 0 : _d.includes('appointment_patientId_fkey'))) {
                    return {
                        status: 'error',
                        content: { message: 'Patient not found' }
                    };
                }
                else if (error.code === 'P2003' && ((_f = (_e = error.meta) === null || _e === void 0 ? void 0 : _e.field_name) === null || _f === void 0 ? void 0 : _f.includes('appointment_practitionerId_fkey'))) {
                    return {
                        status: 'error',
                        content: { message: 'Practitioner not found' }
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
    update(appointmentData, id) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.appointmentRepository.update(appointmentData, id);
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('title'))) {
                    return {
                        status: 'error',
                        content: { message: 'Title already Taken' }
                    };
                }
                else if (error.code === 'P2003' && ((_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.field_name) === null || _d === void 0 ? void 0 : _d.includes('appointment_patientId_fkey'))) {
                    return {
                        status: 'error',
                        content: { message: 'Patient not found' }
                    };
                }
                else if (error.code === 'P2003' && ((_f = (_e = error.meta) === null || _e === void 0 ? void 0 : _e.field_name) === null || _f === void 0 ? void 0 : _f.includes('appointment_practitionerId_fkey'))) {
                    return {
                        status: 'error',
                        content: { message: 'Practitioner not found' }
                    };
                }
                else if (error.code === 'P2025' && ((_h = (_g = error.meta) === null || _g === void 0 ? void 0 : _g.cause) === null || _h === void 0 ? void 0 : _h.includes('Record to update not found'))) {
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
                yield this.appointmentRepository.delete(id);
                return {
                    status: "success",
                    content: {
                        "message": "Record deleted successfully"
                    }
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('hospital'))) {
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
    get() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.appointmentRepository.get();
                return {
                    status: 'success',
                    content: response
                };
            }
            catch (error) {
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('hospital'))) {
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
    getbyId(id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.appointmentRepository.getbyId(id);
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
                if (error.code === 'P2002' && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName) === null || _b === void 0 ? void 0 : _b.includes('hospital'))) {
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
}
exports.AppointmentService = AppointmentService;
