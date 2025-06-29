import Joi from "joi";


export const eventosCrearSchema = Joi.object({
    idCategoria: Joi.number().integer().required()
        .messages({
            'any.required': 'El ID de la categoría es obligatorio.',
            "number.base": "El ID de la categoría debe ser un número entero.",
            "number.integer": "El ID de la categoría debe ser un número entero."
        }),
    nombre: Joi.string().max(100).required()
        .messages({
            'any.required': 'El nombre es obligatorio.',
            "string.empty": "El nombre no puede estar vacío.",
            "string.max": "El nombre no puede exceder los 100 caracteres."
        }),
    descripcion: Joi.string().max(100).required()
        .messages({
            'any.required': 'La descripción es obligatoria.',
            "string.empty": "La descripción no puede estar vacía.",
            "string.max": "La descripción no puede exceder los 100 caracteres."
        }),
    lugar: Joi.string().max(100).required()
        .messages({
            'any.required': 'El lugar es obligatorio.',
            "string.empty": "El lugar no puede estar vacío.",
            "string.max": "El lugar no puede exceder los 100 caracteres."
        }),
     fecha: Joi.date().iso().required()
    .messages({
      'any.required': 'La fecha es obligatoria.',
      'date.base': 'La fecha debe tener un formato válido.',
      'date.format': 'La fecha debe estar en formato ISO (YYYY-MM-DD).',
    }),
    hora: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required()
        .messages({     
            'any.required': 'La hora es obligatoria.',
            "string.empty": "La hora no puede estar vacía.",
            "string.pattern.base": "La hora debe tener el formato HH:MM (24 horas)."
        })
    })

