"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagosCrearSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const MetodoPagoEnum = joi_1.default.string().valid('tarjeta', 'efectivo', 'transferencia', 'yape', // Asumiendo estos son los valores en tu DB
'plin');
const EstadoPagoEnum = joi_1.default.string().valid('pendiente', 'pagado', 'cancelado');
exports.pagosCrearSchema = joi_1.default.object({
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
    monto: joi_1.default.number().precision(2).positive().required()
        .messages({
        'any.required': 'El monto es obligatorio.',
        'number.base': 'El monto debe ser un número.',
        'number.precision': 'El monto debe tener como máximo 2 decimales.',
        'number.positive': 'El monto debe ser un número positivo.'
    }),
    // Método de pago (ENUM)
    metodoPago: MetodoPagoEnum.required()
        .messages({
        'any.required': 'El método de pago es obligatorio.',
        'any.only': 'El método de pago no es válido.'
    }),
    estado: EstadoPagoEnum.optional()
        .messages({
        'any.only': 'El estado de pago no es válido.'
    }),
});
