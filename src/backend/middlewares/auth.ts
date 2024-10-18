import { verify } from "@/backend/helpers/jwt.helper";
import { signupControllers } from "@/backend/controllers";
import { responseHandler } from "@/backend/utils/responseHandler";
import { NextApiRequest, NextApiResponse } from "next";

export const isAuthenticated = ({ skipAuth = false, adminOnly = false }) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      const token = req.headers.authorization;

      if (skipAuth && !token) return next();

      if (!token) throw new Error("Authentication token not found!");

      const tokenData = await verify(token, process.env.SESSION_SECRET || '');
      const userObj = await signupControllers.findOne({ _id: tokenData._id });

      if (!userObj) throw new Error("Unauthorized!");
      if (adminOnly && !['SUPER_ADMIN', 'SUPPORT_ADMIN'].includes(userObj.role[0])) {
        throw new Error("Unauthorized!");
      }

      (req as any).user = userObj;
      next();
    } catch (error: any) {
      return responseHandler.error(res, error, error.message, 401);
    }
  };
};

export const generateToken = async (user: { _id: string, role: string }) => {
  try {
    let token = await signupControllers.registerToken({
      data: { _id: user._id, role: user.role },
      secret: process.env.SESSION_SECRET || 'your_jwt_secret',
      type: 'auth',
      expiresIn: { expiresIn: '1d' }
    }, user);

    let refreshToken = await signupControllers.registerToken({
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