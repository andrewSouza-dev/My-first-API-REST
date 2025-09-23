import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignRepository } from "../repositories/CampaignRepository";


export class CampaignLeadsController {
  constructor(
    private readonly campaignRepository: CampaignRepository) { } 


  addLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body)
      await this.campaignRepository.addLead( { campaignId, leadId, status })

      res.status(201).end()
    } catch (error) {
      next(error)
    }
  }

  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
      const { status } = UpdateLeadStatusRequestSchema.parse(req.body)
      await this.campaignRepository.updateLeadStatus({ campaignId, leadId, status })

      res.status(204).json({ message: "Status do lead atualizado com sucesso!"})
    } catch (error) {
      next(error)
    }
  }

  removeLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
      await this.campaignRepository.removeLead( campaignId, leadId)

      res.json({ message: "Lead removido da campanha com sucesso!" })
    } catch (error) {
      next(error)
    }
  }
}