import z from "zod";

export const CreateCampaignRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.string().transform((val) => new Date(val)),  // poderia usar o string().coerse tambem
    endDate: z.string().transform((val) => new Date(val)).optional()

})


export const UpdateCampaignRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().transform((val) => new Date(val)).optional(),
    endDate: z.string().transform((val) => new Date(val)).optional()
})


const LeadCampaignStatusSchema = z.enum([
  "New",
  "Engaged",
  "FollowUp_Scheduled",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Re_Engaged",
  "Opted_Out"
])



export const GetCampaignLeadsRequestSchema = z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    name: z.string().optional(),
    status: LeadCampaignStatusSchema.optional(),
    sortBy: z.enum(["name", "status"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const AddLeadRequestSchema = z.object({
  leadId: z.coerce.number(),
  status: LeadCampaignStatusSchema.optional(),
  campaignId: z.coerce.number()
})

export const UpdateLeadStatusRequestSchema = z.object({
  status: LeadCampaignStatusSchema
})