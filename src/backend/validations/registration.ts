import Joi from 'joi';

export const validateRegistration = (data: any) => {
  const schema = Joi.object({
    company: Joi.object({
      name: Joi.string().required().min(2).max(100),
      industry: Joi.string().optional(),
      address: Joi.string().optional(),
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().optional(),
      size: Joi.string().valid('small', 'medium', 'large', 'enterprise').optional(),
      settings: Joi.object({
        timezone: Joi.string().optional(),
        currency: Joi.string().optional(),
        language: Joi.string().optional()
      }).optional()
    }).required(),
    
    user: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
      phone: Joi.string().optional(),
      role: Joi.string().valid('Admin', 'User', 'Manager').default('Admin')
    }).required()
  });

  return schema.validate(data);
};
