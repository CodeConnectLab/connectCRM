import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  companyCode: Joi.string().required(),
  phone: Joi.number().optional(),
  role: Joi.string().required(),
});

export const validateSignup = (data: any) => {
  return signupSchema.validate(data, { abortEarly: false });
};