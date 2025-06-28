import Joi from "joi";


export const categoriasCrearSchema = Joi.object({
  nombre: Joi.string().max(100).required()
   .messages({
      'any.required': 'El nombre es obligatorio.',
      "string.empty": "El nombre no puede estar vacío.",
      "string.max": "El nombre no puede exceder los 100 caracteres."
    }),
});
