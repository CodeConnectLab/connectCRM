import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/backend/db/config/mongoose';
import { validateSignup } from '@/backend/validations/signup';
import { rateLimiter } from '@/backend/middlewares/rateLimiter';
import { responseHandler } from '@/backend/utils/responseHandler';
import { signupControllers } from '@/backend/controllers';
import {generateToken} from '@/backend/middlewares/auth'
export default async function register(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'POST') {
    return responseHandler.error(res, null, 'Method not allowed', 405);
  }

  try {
    // Apply rate limiting
    await rateLimiter(req, res);

    // Validate input data
    const { error, value } = validateSignup(req.body);
    if (error) {
      return responseHandler.error(res, error.details, 'Validation error', 400);
    }

    // Create user
    const user = await signupControllers.createUser(value);

    // Generate tokens
    const { token, refreshToken } = await generateToken(user);

    // Prepare response data
    const responseData = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        companyCode: user.companyCode,
        phone: user.phone,
      },
      token: token.token,
      refreshToken: refreshToken.token,
    };

    return responseHandler.success(res, responseData, 'User registered successfully!', 201);
  } catch (error:any) {
    console.error('Registration error:', error);
    return responseHandler.error(res, error, error.message, 500);
  }
}