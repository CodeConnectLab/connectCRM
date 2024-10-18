import User from '@/backend/db/models/user';
import VerificationToken from '@/backend/db/models/verificationToken';
import { responseHandler } from '@/backend/utils/responseHandler';
import { sign } from "@/backend/helpers/jwt.helper"
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  companyCode: string;
  phone?: number;
  role:string;
}) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('This User already exists!');
  }
  // Spread userData to pass fields individually
  const newUser = new User({
    ...userData,
  });
  // Save new user to the database
  return newUser.save();
};


export const findOne = async (query: any) => {
  return await User.findOne(query)
}

const TokenTypes = {
  AUTH: "auth",
  REFRESH: 'refresh'
}

interface RegisterTokenArgs {
  data: any; // Use TokenData type
  type: string;
  secret: string;
  expiresIn?: { expiresIn: string };
}

export const registerToken = async ({ data, type, secret, expiresIn }: RegisterTokenArgs, user: any) => {
  try {
    let token = await sign(data, secret, expiresIn ?? {
      expiresIn: '1d'
    })

    return VerificationToken.create({
      tokenType: type,
      token: token,
      user: user
    })

  } catch (error) {
    return Promise.reject(error)
  }
}



export const signupControllers = {
  createUser,
  findOne,
  registerToken,
};
