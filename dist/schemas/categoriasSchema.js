"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasCrearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.categoriasCrearSchema = joi_1.default.object({
    nombre: joi_1.default.string().max(100).required()
        .messages({
        'any.required': 'El nombre es obligatorio.',
        "string.empty": "El nombre no puede estar vacío.",
        "string.max": "El nombre no puede exceder los 100 caracteres."
    }),
});
