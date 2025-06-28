"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosCrearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.usuariosCrearSchema = joi_1.default.object({
    idEvento: joi_1.default.number().integer().required()
        .messages({
        'any.required': 'El ID del evento es obligatorio.',
        "number.base": "El ID del evento debe ser un número entero.",
        "number.integer": "El ID del evento debe ser un número entero."
    }),
    nombre: joi_1.default.string().max(100).required()
        .messages({
        'any.required': 'El nombre es obligatorio.',
        "string.empty": "El nombre no puede estar vacío.",
        "string.max": "El nombre no puede exceder los 100 caracteres."
    }),
    apellidos: joi_1.default.string().max(100).required()
        .messages({
        'any.required': 'Los apellidos son obligatorios.',
        "string.empty": "Los apellidos no pueden estar vacíos.",
        "string.max": "Los apellidos no pueden exceder los 100 caracteres."
    }),
    correo: joi_1.default.string().email().required()
        .messages({
        'any.required': 'El correo es obligatorio.',
        "string.empty": "El correo no puede estar vacío.",
        "string.email": "El correo debe ser un email válido."
    }),
    dni: joi_1.default.string().length(8).required()
        .messages({
        'any.required': 'El DNI es obligatorio.',
        "string.empty": "El DNI no puede estar vacío.",
        "string.length": "El DNI debe tener exactamente 8 caracteres."
    }),
});
