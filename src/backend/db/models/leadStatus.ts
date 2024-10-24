import mongoose, { Document, Schema } from 'mongoose';
// @ts-ignore
import timestamps from 'mongoose-timestamp';
// @ts-ignore
import mongooseDelete from 'mongoose-delete';
export interface ILeadStatus extends Document {
  displayName: string;
  name: string;
  companyId: mongoose.Types.ObjectId;
  isActive: boolean;
  order: number;
  color?: string;
  createdBy: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const LeadStatusSchema = new Schema<ILeadStatus>({
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Status name is required'],
    trim: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Add compound index for unique name per company
LeadStatusSchema.index({ name: 1, companyId: 1 }, { unique: true });
LeadStatusSchema.index({ order: 1, companyId: 1 });

LeadStatusSchema.plugin(timestamps);
LeadStatusSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
});

export default mongoose.models.LeadStatus || mongoose.model<ILeadStatus>('LeadStatus', LeadStatusSchema);