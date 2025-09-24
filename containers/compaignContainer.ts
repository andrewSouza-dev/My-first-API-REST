import { CaimpaignController } from "../src/controllers/campaignsController";
import { PrismaCampaignRepository } from "../src/repositories/prisma/PrismaCampaignRepository";


//CONTAINER campaigns
export const campaignRepository = new PrismaCampaignRepository()
export const campaignControll = new CaimpaignController(campaignRepository)
