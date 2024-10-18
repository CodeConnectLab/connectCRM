import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseDelete from 'mongoose-delete';
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  companyCode: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  ipaddress:string;
  isPrime:boolean;
  profilePic:string;
  resetPasswordToken:string;
  createdBy:any;
  otp:string;
  otpExpiry:Date;
  hashSalt:string;
  isEmailVerified:boolean;
  isMobileVerified:boolean;
  isActive:boolean;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'User', 'Manager'],
    default: 'User'
  },
  companyCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    trim: true
  },
  profilePic: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  hashSalt: {
    type: String
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isMobileVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ipaddress:{
    type: String
  },
  isPrime: {
    type: Boolean,
    default: false
  },
 
});
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseDelete, {
  deletedBy: true,
  deletedAt: true
});

// Hash the password before saving
UserSchema.pre('save', async function (this: IUser, next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// Check if the model exists, if not create it
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
