import LeadStatus from '../db/models/leadStatus';

export const leadStatusController = {
  // Create new lead status
  create: async (data: any, userId: string) => {
    // Get max order for the company
    const maxOrder = await LeadStatus.findOne({
      companyId: data.companyId
    }).sort('-order');
    
    const leadStatus = await LeadStatus.create({
      ...data,
      order: maxOrder ? maxOrder.order + 1 : 1,
      createdBy: userId
    });
    return leadStatus;
  },

  // Get all lead statuses for a company
  getAllByCompany: async (companyId: string) => {
    return LeadStatus.find({ 
      companyId,
      deleted: { $ne: true }
    }).sort('order');
  },

  // Update lead status
  update: async (id: string, data: any, userId: string) => {
    return LeadStatus.findByIdAndUpdate(
      id,
      { 
        ...data,
        updatedBy: userId
      },
      { new: true }
    );
  },

  // Delete lead status
  delete: async (id: string, userId: string) => {
    const leadStatus = await LeadStatus.findById(id);
    if (leadStatus) {
      // @ts-ignore (from mongoose-delete plugin)
      await leadStatus.delete(userId);
    }
    return leadStatus;
  },

  // Reorder statuses
  reorder: async (companyId: string, statusIds: string[]) => {
    const updates = statusIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index + 1 } }
      }
    }));
    
    return LeadStatus.bulkWrite(updates);
  }
};