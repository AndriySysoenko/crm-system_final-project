import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
      'string.pattern.base': 'Invalid email format',
    }),

  password: Joi.string()
    // .pattern(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*\d)\S*$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters, contain 1 uppercase letter and 1 number',
    }),
});