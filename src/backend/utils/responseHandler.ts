import { NextApiResponse } from 'next';

export const responseHandler = {
  success: (res: NextApiResponse, data: any, message: string, statusCode: number = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res: NextApiResponse, error: any, message: string, statusCode: number = 500) => {
  
    return res.status(statusCode).json({
      success: false,
      message,
      //error: error?.message || error,  // If the error is an object, use the message field
    });
  },
};
