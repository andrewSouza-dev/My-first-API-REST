import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignLeadService } from "../services/CampaignLeadService";


export class CampaignLeadsController {
  constructor(
    private readonly campaignLeadService: CampaignLeadService) { } 

  getLeads: Handler = async (req, res, next) => {
    try {
      const campaingId = Number(req.params.campaignId)
      const query = GetCampaignLeadsRequestSchema.parse(req.query)
      
    } catch (error) {
      next(error)
    }
  }



  addLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.id)
      const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body)
     

      res.status(201).send({ message: "Lead adicionado com sucesso!"})
    } catch (error) {
      next(error)
    }
  }

  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
      const { status } = UpdateLeadStatusRequestSchema.parse(req.body)
      

      res.status(204).json({ message: "Status do lead atualizado com sucesso!"})
    } catch (error) {
      next(error)
    }
  }

  removeLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
     

      res.json({ message: "Lead removido da campanha com sucesso!" })
    } catch (error) {
      next(error)
    }
  }
}