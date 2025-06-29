import Joi from "joi";

const MetodoPagoEnum = Joi.string().valid(
    'tarjeta',
    'efectivo',
    'transferencia',
    'yape', // Asumiendo estos son los valores en tu DB
    'plin'
);

const EstadoPagoEnum = Joi.string().valid(
    'pendiente',
    'pagado',
    'cancelado'
);

export const pagosCrearSchema = Joi.object({
    idEvento: Joi.number().integer().required()
        .messages({
            'any.required': 'El ID de la categoría es obligatorio.',
            "number.base": "El ID de la categoría debe ser un número entero.",
            "number.integer": "El ID de la categoría debe ser un número entero."
        }),
    idUsuario: Joi.number().integer().required()
        .messages({
            'any.required': 'El ID de la categoría es obligatorio.',
            "number.base": "El ID de la categoría debe ser un número entero.",
            "number.integer": "El ID de la categoría debe ser un número entero."
        }),
    monto: Joi.number().precision(2).positive().required()
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
})