import { CampaignLeadsController } from "../src/controllers/CampaignLeadController"
import { PrismaCampaignRepository } from "../src/repositories/prisma/PrismaCampaignRepository"
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository"


// CONTAINER CampaingsLeads
export const campainRepository = new PrismaCampaignRepository()
export const leadsRepository = new PrismaLeadsRepository()
export const campaignLeadsControll = new CampaignLeadsController(campainRepository, leadsRepository)