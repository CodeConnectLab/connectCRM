import mongoose, { Schema, model, Model } from 'mongoose';
// @ts-ignore
import timestamps from 'mongoose-timestamp';
// @ts-ignore
import mongooseDelete from 'mongoose-delete';

interface IVerificationToken {
  token: string;
  user: mongoose.Types.ObjectId;
  tokenType: string;
  deleted: boolean;
}

const TokenSchema = new Schema<IVerificationToken>({
  token: {
    type: String,
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tokenType: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

TokenSchema.plugin(timestamps);
TokenSchema.plugin(mongooseDelete, {
  deletedBy: true,
  deletedAt: true
});

// Check if the model already exists to prevent recompilation
let VerificationToken: Model<IVerificationToken>;

if (mongoose.models.VerificationToken) {
  VerificationToken = mongoose.models.VerificationToken as Model<IVerificationToken>;
} else {
  VerificationToken = model<IVerificationToken>('VerificationToken', TokenSchema);
}

export default VerificationToken;