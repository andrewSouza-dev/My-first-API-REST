import { CampaignLeadsController } from "../src/controllers/CampaignLeadController"
import { PrismaCampaignRepository } from "../src/repositories/prisma/PrismaCampaignRepository"

export const campainRepository = new PrismaCampaignRepository
export const campaignLeadsControll = new CampaignLeadsController(campainRepository)