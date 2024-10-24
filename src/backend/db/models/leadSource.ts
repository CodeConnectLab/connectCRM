import mongoose, { Document, Schema } from 'mongoose';
// @ts-ignore
import timestamps from 'mongoose-timestamp';
// @ts-ignore
import mongooseDelete from 'mongoose-delete';

export interface ILeadSource extends Document {
  name: string;
  companyId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const LeadSourceSchema = new Schema<ILeadSource>({
  name: {
    type: String,
    required: [true, 'Lead source name is required'],
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
LeadSourceSchema.index({ name: 1, companyId: 1 }, { unique: true });

LeadSourceSchema.plugin(timestamps);
LeadSourceSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true
});

export default mongoose.models.LeadSource || mongoose.model<ILeadSource>('LeadSource', LeadSourceSchema);
