"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidationDto = void 0;
const class_validator_1 = require("class-validator");
class appointmentValidationDto {
    constructor() {
        this.tc = true;
        this.payment_completed = false;
        this.id = '';
        this.title = '';
        this.date = '';
        this.time = '';
        this.practitionerId = '';
        this.patientId = '';
        this.service = '';
        this.comment = '';
        this.tc;
        this.payment_completed;
        this.status = '';
        this.expiry = '';
    }
    ;
}
exports.appointmentValidationDto = appointmentValidationDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'ID must be a string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Title is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Title must be a string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Date is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Date must be a string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Time is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Time must be a string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Practitioner is a required field' })
    //@IsString({ message: 'Practitioner must be a string' })
    //@IsOptional()
    ,
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "practitionerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "patientId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Service is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Service must be a string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "service", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Comment is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Comment must be a string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'TC is a required field' }),
    (0, class_validator_1.IsBoolean)({ message: 'TC must be a boolean string' }),
    __metadata("design:type", Boolean)
], appointmentValidationDto.prototype, "tc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Payment Completed is a required field' }),
    (0, class_validator_1.IsBoolean)({ message: 'Payment Completed must be a boolean' }),
    __metadata("design:type", Boolean)
], appointmentValidationDto.prototype, "payment_completed", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Status must be a string' }),
    (0, class_validator_1.IsIn)(['rejected', 'approved', 'pending'], { message: 'Status must be one of: rejected, approved, pending' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Expiry is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Expiry must be a valid date string' }),
    __metadata("design:type", String)
], appointmentValidationDto.prototype, "expiry", void 0);
