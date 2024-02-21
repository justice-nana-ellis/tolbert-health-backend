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
exports.signinPractitionerValidationDto = exports.signupPractitionerValidationDto = void 0;
const class_validator_1 = require("class-validator");
var indentity_card;
(function (indentity_card) {
    indentity_card["GHANA_CARD"] = "GHANA_CARD";
    indentity_card["VOTER_ID"] = "VOTER_ID";
    indentity_card["PASSPORT"] = "PASSPORT";
    indentity_card["DRIVING_LICENCE"] = "DRIVING_LICENCE";
})(indentity_card || (indentity_card = {}));
class signupPractitionerValidationDto {
    constructor() {
        this.verified = false;
        this.id = '';
        this.email = '';
        this.full_name = '';
        this.password = '';
        this.dob = '';
        this.pob = '';
        this.digital_address = '';
        this.contact = '';
        this.id_type = '';
        this.id_number = '';
        this.qualification = '';
        this.licence_number = '';
        this.specialisations = [];
        this.hospitals = [];
        this.appointments = [];
        this.verified;
    }
}
exports.signupPractitionerValidationDto = signupPractitionerValidationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'full_name is a required field' }),
    (0, class_validator_1.IsString)({ message: 'full_name must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'full_name must be at least 3 characters long' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is a required field' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/, { message: 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Date of Birth must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date of Birth is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Place of Birth must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Place of Birth is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "pob", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Digital Address must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Digital Address is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "digital_address", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Contact must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contact is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "contact", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'ID Type must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID Type is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "id_type", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'ID Number must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID Number is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "id_number", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Qualification must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Qualification is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "qualification", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Licence Number must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Licence Number is a required field' }),
    __metadata("design:type", String)
], signupPractitionerValidationDto.prototype, "licence_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], signupPractitionerValidationDto.prototype, "specialisations", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], signupPractitionerValidationDto.prototype, "hospitals", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], signupPractitionerValidationDto.prototype, "appointments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], signupPractitionerValidationDto.prototype, "verified", void 0);
class signinPractitionerValidationDto {
    constructor() {
        this.email = '';
        this.password = '';
    }
}
exports.signinPractitionerValidationDto = signinPractitionerValidationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is a required field' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], signinPractitionerValidationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is a required field' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/, { message: 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character' }),
    __metadata("design:type", String)
], signinPractitionerValidationDto.prototype, "password", void 0);
