"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistenciasCrearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.asistenciasCrearSchema = joi_1.default.object({
    idEvento: joi_1.default.number().integer().required()
        .messages({
        'any.required': 'El ID del evento es obligatorio.',
        "number.base": "El ID del evento debe ser un número entero.",
        "number.integer": "El ID del evento debe ser un número entero."
    }),
    idUsuario: joi_1.default.number().integer().required()
        .messages({
        'any.required': 'El ID del usuario es obligatorio.',
        "number.base": "El ID del usuario debe ser un número entero.",
        "number.integer": "El ID del usuario debe ser un número entero."
    }),
    nombres: joi_1.default.string().max(100).required()
        .messages({
        'any.required': 'El nombre es obligatorio.',
        "string.empty": "El nombre no puede estar vacío.",
        "string.max": "El nombre no puede exceder los 100 caracteres."
    }),
    apellidos: joi_1.default.string().max(100).required()
        .messages({
        'any.required': 'El apellidos es obligatorio.',
        "string.empty": "El apellidos no puede estar vacío.",
        "string.max": "El apellidos no puede exceder los 100 caracteres."
    }),
    correo: joi_1.default.string().email().required()
        .messages({
        'any.required': 'El correo es obligatorio.',
        "string.empty": "El correo no puede estar vacío.",
        "string.email": "El correo debe ser un email válido."
    }),
    dni: joi_1.default.string().length(8).pattern(/^\d{8}$/).required() // Exactamente 8 dígitos numéricos
        .messages({
        'any.required': 'El DNI es obligatorio.',
        'string.empty': 'El DNI no puede estar vacío.',
        'string.length': 'El DNI debe tener exactamente 8 caracteres.',
        'string.pattern.base': 'El DNI debe contener solo números.'
    }),
    telefono: joi_1.default.string().length(9).pattern(/^\d{9}$/).required() // Exactamente 9 dígitos numéricos
        .messages({
        'any.required': 'El teléfono es obligatorio.',
        'string.empty': 'El teléfono no puede estar vacío.',
        'string.length': 'El teléfono debe tener exactamente 9 dígitos.',
        'string.pattern.base': 'El teléfono debe contener solo números.'
    }),
});
