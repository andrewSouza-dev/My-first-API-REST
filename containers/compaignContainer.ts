import { CaimpaignController } from "../src/controllers/campaignsController";
import { PrismaCampaignRepository } from "../src/repositories/prisma/PrismaCampaignRepository";
import { CampaignServices } from "../src/services/CampaignService";


//CONTAINER campaigns
export const campaignRepository = new PrismaCampaignRepository()
export const campaignService = new CampaignServices(campaignRepository)
export const campaignControll = new CaimpaignController(campaignService)
