import { AddLeadToCampaignAttributes, CampaignRepository, LeadStatusCampaign } from "../repositories/CampaignRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadRepository";

interface GetLeadWithPagination {
    page?: number
    pageSize?: number
    name?: string
    status?: LeadStatusCampaign
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc" 
}


export class CampaignLeadService {
    constructor (
        private readonly campaignsRepository: CampaignRepository,
        private readonly leadsRepository: LeadsRepository
    ) {}


    async allLeadsCampaign (params: GetLeadWithPagination) {
      const { name, status, page = 1, pageSize = 10, sortBy , order } = params

      const limit = pageSize
      const offset = (page - 1) * limit

     
      const where: LeadWhereParams = { campaignStatus: status }

      if (name) where.name = { like: name, mode: "insensitive" }

      const leads = await this.leadsRepository.find({
        where,
        sortBy,
        order,
        limit,
        offset,
        include: { campaigns: true }})

      const total = await this.leadsRepository.count(where)

      return {
        leads,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize)
        }
      }
    }


    async addLead (params: AddLeadToCampaignAttributes) {
        const addLead = await this.campaignsRepository.addLead(params)
        return addLead 


    }


    async updateLeadStatus (params: AddLeadToCampaignAttributes) {
        const updateLead = await this.campaignsRepository.updateLeadStatus(params)
        return updateLead
    }


    async removeLead (campaignId: number, leadId: number ) {
        const removeLead =  await this.campaignsRepository.removeLead(campaignId, leadId)
        return removeLead
 

    }
}