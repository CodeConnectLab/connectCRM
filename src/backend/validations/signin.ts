// import Joi from 'joi';

// export const validateSignin = (data: any) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });

//   return schema.validate(data);
// };


import Joi from 'joi';

export const validateSignin = (data: any) => {
  const schema = Joi.object({
    // Email or phone validation
    email: Joi.string()
      .email()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email address'
      }),
    phone: Joi.string()
      .pattern(/^[+]?[\d\s-]+$/)
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Please provide a valid phone number'
      }),

    // Password validation
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty'
      }),

    // OTP validation
    otp: Joi.string()
      .length(6)
      .pattern(/^[0-9]+$/)
      .messages({
        'string.length': 'OTP must be 6 digits',
        'string.pattern.base': 'OTP must contain only numbers'
      })
  })
  .xor('email', 'phone')  // Require either email or phone, but not both
  .xor('password', 'otp') // Require either password or otp, but not both
  .required()
  .messages({
    'object.xor': 'Please provide either email or phone number',
    'object.missing': 'Please provide login credentials'
  });

  return schema.validate(data, { 
    abortEarly: false,  // Show all validation errors
    stripUnknown: true  // Remove unknown fields
  });
};