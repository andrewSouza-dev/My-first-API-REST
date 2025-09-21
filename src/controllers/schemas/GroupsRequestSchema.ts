import { optional, z } from "zod";

export const CreateGroupRequestSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const UpdateGroupRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
})


const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
])

export const GetLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional()
})

export const AddLeadRequestSchema = z.object({
  leadId: z.number()
})

