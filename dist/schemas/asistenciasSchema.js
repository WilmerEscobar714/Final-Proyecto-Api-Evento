"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistenciasCrearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.asistenciasCrearSchema = joi_1.default.object({
    idUsuario: joi_1.default.number().integer().required()
        .messages({
        'any.required': 'El ID del usuario es obligatorio.',
        "number.base": "El ID del usuario debe ser un número entero.",
        "number.integer": "El ID del usuario debe ser un número entero."
    }),
    telefono: joi_1.default.string().length(9).pattern(/^\d{9}$/).required() // Exactamente 9 dígitos numéricos
        .messages({
        'any.required': 'El teléfono es obligatorio.',
        'string.empty': 'El teléfono no puede estar vacío.',
        'string.length': 'El teléfono debe tener exactamente 9 dígitos.',
        'string.pattern.base': 'El teléfono debe contener solo números.'
    }),
    // Nueva validación para 'asistio'
    asistio: joi_1.default.string()
        .length(1) // Debe tener exactamente 1 carácter
        .valid('0', '1') // Solo permite los valores '0' o '1'
        .default('0') // Opcional: si no se envía, Joi lo establecerá en '0'
        .messages({
        'string.length': 'El campo asistio debe tener exactamente 1 carácter.',
        'any.only': 'El campo asistio solo puede ser "0" (no asistió) o "1" (asistió).'
    })
});
