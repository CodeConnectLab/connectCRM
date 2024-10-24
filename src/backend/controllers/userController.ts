import User from '@/backend/db/models/user';
import { generateSalt, getHashedPassword } from '@/backend/utils/util';
import { generateToken } from '@/backend/middlewares/auth'


export const createUser = async (userData: {
  name: string;
  email: string;
  password: string
  companyCode: string;
  phone?: number;
  role: string;
}) => {
    
  try {
    // Check if email exists
    
    const emailExists = await User.findOne({ email: userData?.email }).lean();
    if (emailExists) {
      throw new Error('This User already exists!');
    }

    // Check if companyCode is unique
    const companyCodeExists = await User.findOne({ companyCode: userData.companyCode }).lean();
    if (companyCodeExists) {
      throw new Error('Company code already exists!');
      
    }
   let randPassword;
    if (userData?.password) {
      /////   userData?.password   lenght 6 if given 
       randPassword = userData?.password;
    } else {
      // Generate random password and salt
       randPassword = '1234'; // You might want to generate a random password
    }

    const userSalt = generateSalt();

    // Create new user
    const createdUser = await User.create({
      name: userData.name,
      email: userData.email,
      companyCode: userData.companyCode,
      phone: userData.phone,
      role: userData.role,
      hashedPassword: getHashedPassword(randPassword, userSalt),
      hashSalt: userSalt,
      // Add any other fields that are required for your User model
    });

    // Generate tokens
    const { token, refreshToken } = await generateToken(createdUser);

    // You might want to send a welcome email here with the random password

    return {
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        companyCode: createdUser.companyCode,
        role: createdUser.role,
      },
      token: token.token,
      refreshToken: refreshToken.token
    };
  } catch (error) {
    return Promise.reject(error);
  }
};


export const findOne = async (query: any) => {
  return await User.findOne(query)
}


export const signupControllers = {
  createUser,
  findOne,
};
