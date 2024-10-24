// import User from '@/backend/db/models/user';
// import { getHashedPassword } from '@/backend/utils/util';
// import { verificationTokensService } from '@/backend/controllers/authControllers';
// import { generateToken } from '@/backend/middlewares/auth';

// interface AuthenticateUserResult {
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     companyCode: string;
//     role: string;
//   };
//   token: {
//     token: string;
//   };
//   refreshToken: {
//     token: string;
//   };
// }
// export const authenticateUser=async(credentials: { email: string; password?: string; otp?: string }): Promise<AuthenticateUserResult>=>{
//   const maybeUser = await User.findOne({ email: credentials.email });
//   if (!maybeUser) throw new Error("No User Avilable!");

//   if (credentials.password) {
//     let hashedPassword = getHashedPassword(credentials.password, maybeUser.hashSalt);
//     if (hashedPassword !== maybeUser.hashedPassword) throw new Error("Wrong Password!");
//     if (maybeUser.passwordExpiry < new Date()) throw new Error('Password Expired!');
//   }

//   if (credentials.otp) {
//     let hashedOtp = getHashedPassword(credentials.otp, maybeUser.hashSalt);
//     if (hashedOtp !== maybeUser.otp) throw new Error("Invalid OTP!");
//     if (maybeUser.otpExpiry < new Date()) throw new Error('OTP Expired!');
//   }

//   let existingToken = await verificationTokensService.checkUserLoggedIn(maybeUser._id);

//   if (existingToken) {
//     // if already logged in, mark all tokens as deleted
//     await verificationTokensService.revokeAllTokenForUser(maybeUser._id);
//   }

//   let { token, refreshToken } = await generateToken(maybeUser);

//   return { user: maybeUser, token, refreshToken };
// }



// export const signinControllers = {
//   authenticateUser,
// };

import User from '@/backend/db/models/user';
import { getHashedPassword } from '@/backend/utils/util';
import { verificationTokensService } from '@/backend/controllers/authControllers';
import { generateToken } from '@/backend/middlewares/auth';

interface AuthenticateUserResult {
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    companyCode: string;
    role: string;
    company?: any;
  };
  token: {
    token: string;
  };
  refreshToken: {
    token: string;
  };
}

interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
}

export const authenticateUser = async(
  credentials: LoginCredentials
): Promise<AuthenticateUserResult> => {
  // Find user by email or phone
  const query = credentials.email 
    ? { email: credentials.email }
    : { phone: credentials.phone };

   

    const maybeUser = await User.findOne({ email: credentials.email })
    .populate({
      path: 'companyId',
      model: 'company', // Make sure this matches the model name
      select: 'code name status subscription'
    });
    
  if (!maybeUser) {
    throw new Error(credentials.email 
      ? "No user found with this email!"
      : "No user found with this phone number!"
    );
  }

  // Check if user and company are active
  if (!maybeUser.isActive) {
    throw new Error("Account is inactive!");
  }

  if (maybeUser.companyId?.status !== 'active') {
    throw new Error("Company account is inactive!");
  }

  // Password authentication
  if (credentials.password) {
    const hashedPassword = getHashedPassword(credentials.password, maybeUser.hashSalt);
    if (hashedPassword !== maybeUser.hashedPassword) {
      throw new Error("Invalid credentials!");
    }
    if (maybeUser.passwordExpiry && maybeUser.passwordExpiry < new Date()) {
      throw new Error('Password has expired! Please reset your password.');
    }
  }

  // OTP authentication
  if (credentials.otp) {
    const hashedOtp = getHashedPassword(credentials.otp, maybeUser.hashSalt);
    if (hashedOtp !== maybeUser.otp) {
      throw new Error("Invalid OTP!");
    }
    if (maybeUser.otpExpiry && maybeUser.otpExpiry < new Date()) {
      throw new Error('OTP has expired! Please request a new one.');
    }
  }

  // Check and revoke existing tokens
  const existingToken = await verificationTokensService.checkUserLoggedIn(maybeUser._id);
  if (existingToken) {
    await verificationTokensService.revokeAllTokenForUser(maybeUser._id);
  }

  // Generate new tokens with company information
  const { token, refreshToken } = await generateToken({
    _id: maybeUser._id,
    role: maybeUser.role,
    companyId: maybeUser.companyId._id
  });

  // Update last login
  await User.findByIdAndUpdate(maybeUser._id, {
    $set: { 
      lastLogin: new Date(),
      loginAttempts: 0 // Reset login attempts on successful login
    }
  });

  // Prepare user response
  const userResponse = {
    _id: maybeUser._id,
    name: maybeUser.name,
    email: maybeUser.email,
    phone: maybeUser.phone,
    companyCode: maybeUser.companyId.code,
    role: maybeUser.role,
    isEmailVerified: maybeUser.isEmailVerified,
    isMobileVerified: maybeUser.isMobileVerified,
    company: {
      id: maybeUser.companyId._id,
      name: maybeUser.companyId.name,
      code: maybeUser.companyId.code,
      subscription: maybeUser.companyId.subscription
    }
  };

  return { 
    user: userResponse, 
    token, 
    refreshToken 
  };
};

export const signinControllers = {
  authenticateUser,
};