// @ts-ignore
import jwt from 'jsonwebtoken';

export const sign = (data:any, secret:any, expiresIn = { expiresIn: '1d' }) => {
    return jwt.sign(data, secret, expiresIn);
};

export const verify = (token:any, secret:any) => {
    return jwt.verify(token, secret);
};

// Add a logout function if needed
export const logout = async (token:any) => {
    // Logic to handle logout
};