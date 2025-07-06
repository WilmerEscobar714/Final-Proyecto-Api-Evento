import Joi from "joi";

export const asistenciasCrearSchema = Joi.object({
    idUsuario: Joi.number().integer().required()
        .messages({
            'any.required': 'El ID del usuario es obligatorio.',
            "number.base": "El ID del usuario debe ser un número entero.",
            "number.integer": "El ID del usuario debe ser un número entero."    
        }),
    telefono: Joi.string().length(9).pattern(/^\d{9}$/).required() // Exactamente 9 dígitos numéricos
        .messages({
            'any.required': 'El teléfono es obligatorio.',
            'string.empty': 'El teléfono no puede estar vacío.',
            'string.length': 'El teléfono debe tener exactamente 9 dígitos.',
            'string.pattern.base': 'El teléfono debe contener solo números.'
        }),
         // Nueva validación para 'asistio'
    asistio: Joi.string()
        .length(1) // Debe tener exactamente 1 carácter
        .valid('0', '1') // Solo permite los valores '0' o '1'
        .default('0') // Opcional: si no se envía, Joi lo establecerá en '0'
        .messages({
            'string.length': 'El campo asistio debe tener exactamente 1 carácter.',
            'any.only': 'El campo asistio solo puede ser "0" (no asistió) o "1" (asistió).'
        })
    
        
})