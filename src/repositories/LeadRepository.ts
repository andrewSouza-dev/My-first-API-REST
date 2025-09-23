import { Lead, LeadStatus } from "@prisma/client";


export type LeadsStatus = "New" | "Contacted" | "Qualified" | "Converted" |"Unresponsive" | "Disqualified" | "Archived"

export interface LeadWhereParams{
  name?: {
    like?: string
    equals?: string
    mode?: "default" | "insensitive"
  }
  status?: LeadsStatus
  groupId?: number
}


export interface FindLeadsParams {
    where?: LeadWhereParams
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
    limit?: number
    offset?: number
    include?: {
      groups?: boolean
      campaigns?: boolean
    }
}


export interface CreateLeadAttributes {
   name: string
   email: string
   phone: string
   status?: LeadStatus
}

export interface  LeadsRepository {
    find: (params: FindLeadsParams) => Promise<Lead[]>
    findById: (id: number) => Promise<Lead | null>
    count: (where: LeadWhereParams) => Promise<number>
    create: (params: CreateLeadAttributes) => Promise<Lead>
    updateById: (id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead | null>
    deleteById: (id: number) => Promise<Lead | null>
}
