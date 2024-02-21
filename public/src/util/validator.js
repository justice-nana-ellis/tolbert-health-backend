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
exports.getErrorMessages = void 0;
const class_validator_1 = require("class-validator");
const getErrorMessages = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = yield (0, class_validator_1.validate)(project, { skipMissingProperties: false });
    if (validationErrors.length > 0) {
        return validationErrors.flatMap((error) => {
            return error.constraints ? Object.values(error.constraints) : [];
        });
    }
    return [];
});
exports.getErrorMessages = getErrorMessages;
