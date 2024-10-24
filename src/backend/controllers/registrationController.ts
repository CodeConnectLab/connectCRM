import { Types } from 'mongoose';
import Company from '@/backend/db/models/company';
import User from '@/backend/db/models/user';
import { generateCompanyCode, generateSalt, getHashedPassword } from '@/backend/utils/util';
import { generateToken } from '@/backend/middlewares/auth';

interface RegistrationResult {
  company: any;
  user: any;
  token: {
    token: string;
  };
  refreshToken: {
    token: string;
  };
}

interface UserValidationError extends Error {
  code: number;
  field?: string;
}

const checkExistingUser = async (email?: string, phone?: string): Promise<void> => {
  // Check email if provided
  if (email) {
    const existingUserEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserEmail) {
      const error = new Error('Email already registered') as UserValidationError;
      error.code = 409;
      error.field = 'email';
      throw error;
    }
  }

  // Check phone if provided
  if (phone) {
    const existingUserPhone = await User.findOne({ phone });
    if (existingUserPhone) {
      const error = new Error('Phone number already registered') as UserValidationError;
      error.code = 409;
      error.field = 'phone';
      throw error;
    }
  }
};


export const registerCompanyAndAdmin = async (
  companyData: any,
  userData: any,
  ipaddress?: string
): Promise<RegistrationResult> => {
  const session = await Company.startSession();
  session.startTransaction();

  try {

    // Validate user data before starting transaction
    await checkExistingUser(userData.email, userData.phone);
    // Generate company code
    const companyCode = await generateCompanyCode();

    // Create company
    const company = await Company.create([{
      ...companyData,
      code: companyCode,
      status: 'active',
      subscription: {
        plan: 'free',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days trial
        status: 'trial'
      }
    }], { session });

    // Generate password hash
    const hashSalt = generateSalt();
    const hashedPassword = getHashedPassword(userData.password, hashSalt);

    // Create admin user
    const user = await User.create([{
      ...userData,
      companyId: company[0]._id,
      role: 'Admin',
      hashedPassword,
      hashSalt,
      isEmailVerified: false,
      isMobileVerified: false,
      isActive: true,
      ipaddress,
      isPrime: false
    }], { session });

    // Update company with created by
    await Company.findByIdAndUpdate(
      company[0]._id,
      { createdBy: user[0]._id },
      { session }
    );

    // Generate tokens
    const { token, refreshToken } = await generateToken(user[0]);

    await session.commitTransaction();

    return {
      company: company[0],
      user: user[0],
      token,
      refreshToken
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

interface UserRegistrationResult {
  user: any;
  token: {
    token: string;
  };
  refreshToken: {
    token: string;
  };
}

interface UserData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: 'Admin' | 'User' | 'Manager';
}

export const registerUser = async (
  companyId: string,
  userData: UserData,
  createdBy: string
): Promise<UserRegistrationResult> => {
  const session = await User.startSession();
  session.startTransaction();

  try {
    // Check if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    if (company.status !== 'active') {
      throw new Error('Company is not active');
    }

    // Validate user data
    await checkExistingUser(userData.email, userData.phone);

    // Generate password hash
    const hashSalt = generateSalt();
    const hashedPassword = getHashedPassword(userData.password, hashSalt);

    // Create user
    const user = await User.create([{
      name: userData.name,
      email: userData.email.toLowerCase(),
      phone: userData.phone,
      companyId: company._id,
      role: userData.role || 'User',
      hashedPassword,
      hashSalt,
      isEmailVerified: false,
      isMobileVerified: false,
      isActive: true,
      isPrime: false,
      createdBy
    }], { session });

    // Generate tokens
    const { token, refreshToken } = await generateToken({
      _id: user[0]._id,
      role: user[0].role,
      companyId: company._id
    });

    await session.commitTransaction();

    return {
      user: user[0],
      token,
      refreshToken
    };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};



export const registrationController = {
  registerCompanyAndAdmin,
  registerUser
};