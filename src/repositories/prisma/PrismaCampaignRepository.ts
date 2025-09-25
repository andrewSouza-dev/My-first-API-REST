import { Campaign } from "@prisma/client";
import { AddLeadToCampaignAttributes, CampaignRepository, CreateCampaignAttributes } from "../CampaignRepository";
import { prisma } from "../../database";


export class PrismaCampaignRepository implements CampaignRepository {
    find(): Promise<Campaign[]> {
        return prisma.campaign.findMany()
    }
    
    
    findById(id: number): Promise<Campaign | null> {
        return prisma.campaign.findUnique({ 
            where: {id},
            include: {
                leads: {
                    include: {
                        lead: true
                    }
                }
            }
         })
    }
    
    
    create(attributes: CreateCampaignAttributes): Promise<Campaign> {
        return prisma.campaign.create({ data: attributes })
    }
    
    
    async updateById(id: number, attributes: Partial<CreateCampaignAttributes>): Promise<Campaign | null> {
        const campaignExists = await prisma.campaign.findUnique({ where: { id }})
        if(!campaignExists) return null

        return prisma.campaign.update({ 
            where: { id },
            data: attributes
        })
    }
    
    
    async deleteById(id: number): Promise<Campaign | null> {
        const campaignExists = await prisma.campaign.findUnique({ where: { id }})
        if(!campaignExists) return null

        return prisma.campaign.delete({where: {id}})
    }

 
 
// CampaignsLeads
    async addLead(attributes: AddLeadToCampaignAttributes): Promise<void> {
        await prisma.leadCampaign.create({ 
            data: {
              leadId: attributes.leadId,
              campaignId: attributes.campaignId,
              status: attributes.status
            }
        })
    }
        
    async removeLead(campaignId: number, leadId: number): Promise<void> {
        await prisma.leadCampaign.delete({ 
            where: { 
                leadId_campaignId: { campaignId, leadId }
            }
        })      
    }
    async updateLeadStatus(attributes: AddLeadToCampaignAttributes): Promise<void> {
        await prisma.leadCampaign.update({ 
            data: { status: attributes.status } ,
            where: {
                leadId_campaignId: {
                    campaignId: attributes.campaignId,
                    leadId: attributes.leadId,
                }
            }
        })
    }
}