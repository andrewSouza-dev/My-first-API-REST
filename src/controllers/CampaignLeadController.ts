import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignLeadService } from "../services/CampaignLeadService";
import { LeadCampaignStatus } from "@prisma/client";


export class CampaignLeadsController {
  constructor(
    private readonly campaignLeadService: CampaignLeadService) { } 

  getLeads: Handler = async (req, res, next) => {
    try {
      const query = GetCampaignLeadsRequestSchema.parse(req.query)
      
      const { page = "1", pageSize = "10"} = query
      
      const result = await this.campaignLeadService.allLeadsCampaign({
      ...query,
      page: +page,
      pageSize: +pageSize,
      })
      res.json(result)   
    } catch (error) {
      next(error)
    }
  }



  addLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.id)
      const leadId = Number(req.params.leadId)
      const status = "New" 

      const addLead = await this.campaignLeadService.addLead({campaignId, leadId, status})
      res.status(201).json(addLead)
    } catch (error) {
      next(error)
    }
  }

  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.id)
      const leadId = Number(req.params.leadId)
      const status = "New"

      const updatedLead = await this.campaignLeadService.updateLeadStatus({campaignId, leadId, status})
      res.status(204).json(updatedLead)
    } catch (error) {
      next(error)
    }
  }

  removeLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)

      const removedLead = await this.campaignLeadService.removeLead(campaignId, leadId)
      res.json({ removedLead })
    } catch (error) {
      next(error)
    }
  }
}