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

  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
}).custom((value, helpers) => {
  const isDefaultAdmin = value.email === 'admin@gmail.com' && value.password === 'admin';

  if (!isDefaultAdmin) {
    const strongPasswordRegex = /^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*\d)\S*$/;
    if (!strongPasswordRegex.test(value.password)) {
      return helpers.error('any.custom', {
        message:
          'Password must be at least 8 characters, contain 1 uppercase letter and 1 number',
      });
    }
  }

  return value;
}).messages({
  'any.custom': '{{#message}}',
});