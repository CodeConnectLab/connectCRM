import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 50, 
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req: NextApiRequest) => {
    // Use `x-forwarded-for` header if available, otherwise fallback to a default IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return ip as string;
  },
  handler: (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
});

export const rateLimiter = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    limiter(req, res, (result: any) => {
      if (result instanceof Error) {
        reject(result);
      }
      resolve(result);
    });
  });
};
