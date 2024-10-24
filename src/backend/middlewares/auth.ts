import { verify } from "@/backend/helpers/jwt.helper";
import { authControllers } from "../controllers/authControllers";
import { signupControllers } from "../controllers";
import { responseHandler } from "@/backend/utils/responseHandler";
import { NextApiRequest, NextApiResponse } from "next";
import User from '@/backend/db/models/user';



declare module 'next' {
  interface NextApiRequest {
    user?: any; // or a more specific type if you know what the user object should contain
  }
}

interface AuthMiddlewareOptions {
  skipAuth?: boolean;
  adminOnly?: boolean;
}

export const isAuthenticated = (options: AuthMiddlewareOptions = {}) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      const { skipAuth = false, adminOnly = false } = options;

      const token = req.headers.authorization?.replace('Bearer ', '');

      if (skipAuth && !token) return next();

      if (!token) throw new Error("Authentication token not found!");
      const tokenData = await verify(token, process.env.SESSION_SECRET || 'your_jwt_secret');
      const userObj = await User.findOne({_id:tokenData?._id});

      if (!userObj) throw new Error("Unauthorized!");

      if (adminOnly && !['SUPER_ADMIN', 'SUPPORT_ADMIN'].includes(userObj.role)) {
        throw new Error("Unauthorized - Admin access required!");
      }

      // Add user to request
      req.user = userObj;
      next();
      
    } catch (error: any) {
      return responseHandler.error(res, '', error.message || 'Authentication failed', 401);
    }
  };
};

export const generateToken = async (user: { _id: string, role: string, companyId: string  }) => {
  try {
    let token = await authControllers.registerToken({
      data: { _id: user._id, role: user.role, companyId:user.companyId },
      secret: process.env.SESSION_SECRET || 'your_jwt_secret',
      type: 'auth',
      expiresIn: { expiresIn: '1d' }
    }, user);

    let refreshToken = await authControllers.registerToken({
      data: { _id: user._id, role: user.role },
      secret: process.env.REFRESH_SECRET || 'your_refresh_jwt_secret',
      type: 'refresh',
      expiresIn: { expiresIn: '4d' }
    }, user);

    return { token, refreshToken };
  } catch (error) {
    return Promise.reject(error);
  }
};