import jwt from 'jsonwebtoken';

export const sign = (data, secret, expiresIn = { expiresIn: '1d' }) => {
    return jwt.sign(data, secret, expiresIn);
};

export const verify = (token, secret) => {
    return jwt.verify(token, secret);
};

// Add a logout function if needed
export const logout = async (token) => {
    // Logic to handle logout
};