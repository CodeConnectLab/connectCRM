
// @ts-ignore
import crypto = require("crypto")


export const generateCompanyCode = () => {
    const timestamp = Date.now().toString();
    return `COM${timestamp.slice(-6)}`;
  };

export const getHashedPassword = (password:any, salt:any) => {
    return crypto.createHash("sha512").update(password + salt).digest("hex");
}

export const generateSalt = () => {
    return crypto.randomBytes(16).toString("base64");
}

export const generatePassword = () => {
    var length = 6,
        charset = "ab78cdef05ghi34jklmnopqr12stuvwxyz69",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const generateOTP = (len = 4) => {
    var length = len,
        charset = "1234567890",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}