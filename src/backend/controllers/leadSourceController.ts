import LeadSource from '../db/models/leadSource';


export const leadSourceController = {
  // Create new lead source
  create: async (data: any, userId: string) => {
    const leadSource = await LeadSource.create({
      ...data,
      createdBy: userId
    });
    return leadSource;
  },

  // Get all lead sources for a company
  getAllByCompany: async (companyId: string) => {
    return LeadSource.find({ 
      companyId,
      deleted: { $ne: true }
    }).sort('name');
  },

  // Update lead source
  update: async (id: string, data: any, userId: string) => {
    return LeadSource.findByIdAndUpdate(
      id,
      { 
        ...data,
        updatedBy: userId
      },
      { new: true }
    );
  },

  // Delete lead source
  delete: async (id: string, userId: string) => {
    const leadSource = await LeadSource.findById(id);
    if (leadSource) {
      // @ts-ignore (from mongoose-delete plugin)
      await leadSource.delete(userId);
    }
    return leadSource;
  }
};