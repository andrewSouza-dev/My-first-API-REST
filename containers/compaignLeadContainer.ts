import { CampaignLeadsController } from "../src/controllers/CampaignLeadController"
import { PrismaCampaignRepository } from "../src/repositories/prisma/PrismaCampaignRepository"
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository"
import { CampaignLeadService } from "../src/services/CampaignLeadService"


// CONTAINER CampaingsLeads
export const campainRepository = new PrismaCampaignRepository()
export const leadsRepository = new PrismaLeadsRepository()
export const campaingLeadService = new CampaignLeadService(campainRepository, leadsRepository)
export const campaignLeadsControll = new CampaignLeadsController(campaingLeadService)