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
  const latinOnlyRegex = /^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

  if (!isDefaultAdmin) {
    if (!latinOnlyRegex.test(value.password)) {
      return helpers.error('any.custom', {
        message: 'Use Latin letters',
      });
    }

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!strongPasswordRegex.test(value.password)) {
      return helpers.error('any.custom', {
        message:
          '8 characters хХххх1хх',
      });
    }

  }

  return value;
}).messages({
  'any.custom': '{{#message}}',
});