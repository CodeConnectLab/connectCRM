import VerificationToken from '@/backend/db/models/verificationToken';
import { responseHandler } from '@/backend/utils/responseHandler';
import { sign } from "@/backend/helpers/jwt.helper"

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

  export const verificationTokensService = {
    checkUserLoggedIn: async (userId: string) => {
      return VerificationToken.findOne({
        user: userId,
        tokenType: 'auth',
        deleted: false
      });
    },
  
    revokeAllTokenForUser: async (userId: string) => {
      return VerificationToken.updateMany({ 
        user: userId 
      }, {
        deleted: true
      });
    }
  };


  


  
export const authControllers = {
     registerToken,
     verificationTokensService,
  };
  