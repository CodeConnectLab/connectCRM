import Joi from 'joi';

export const validateUserRegistration = (data: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(50)
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 50 characters'
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
      }),

    phone: Joi.string()
      .pattern(/^[+]?[\d\s-]+$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),

    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      }),

    role: Joi.string()
      .valid('User', 'Manager')
      .default('User')
      .messages({
        'any.only': 'Invalid role specified'
      })
  });

  return schema.validate(data, { abortEarly: false });
};