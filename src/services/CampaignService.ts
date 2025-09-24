import { HttpError } from "../errors/HttpError";
import { CampaignRepository, CreateCampaignAttributes } from "../repositories/CampaignRepository";


export class CampaignServices {
    constructor(private readonly campaignRepository: CampaignRepository) {} 

    async getAllCampaigns() {
        const campaigns = await this.campaignRepository.find()
        return campaigns
    }

    async show(id: number) {
        const campaign = await this.campaignRepository.findById(id)
        if(!campaign) throw new HttpError (404, "Campanha não encontrado!")
        return campaign
    }

    
    async create(params: CreateCampaignAttributes) {
       const newCampaing = await this.campaignRepository.create(params)
       return newCampaing
    }


    async update(id: number, params: Partial<CreateCampaignAttributes>) {
       const updateCampaing = await this.campaignRepository.updateById(id, params)
       if(!updateCampaing) throw new HttpError(404, "Campaign não encontrado!")
       return updateCampaing
    }


    async delete(id: number) {
        const deleteCampaign = await this.campaignRepository.deleteById(id)
        if(!deleteCampaign) throw new HttpError(404, "Camapanha não encontrado!")
        return deleteCampaign
    }

}