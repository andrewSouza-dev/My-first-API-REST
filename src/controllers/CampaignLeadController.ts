import { Handler } from "express";
import { AddLeadRequestSchema, CampaignLeadParamsSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignLeadService } from "../services/CampaignLeadService";


export class CampaignLeadsController {
  constructor(
    private readonly campaignLeadService: CampaignLeadService) { } 


// Listar leads da campanha com paginação e filtros
  getLeads: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)

      const query = GetCampaignLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10"} = query
      
      const result = await this.campaignLeadService.allLeadsCampaign({
      ...query,
      page: +page,
      pageSize: +pageSize,
      campaignId
      })

      res.json(result)   
    } catch (error) {
      next(error)
    }
  }


// Adicionar lead à campanha
  addLead: Handler = async (req, res, next) => {
    try {
      const { campaignId } =  CampaignLeadParamsSchema.parse(req.params)

      const { leadId, status } = AddLeadRequestSchema.parse(req.body)
      
      const addLead = await this.campaignLeadService.addLead({
        campaignId,
        leadId,
        status: status ?? "New"
      })

      res.status(201).json(addLead)
    } catch (error) {
      next(error)
    }
  }


// Atualizar status de lead na campanha
  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
      const {status} = UpdateLeadStatusRequestSchema.parse(req.body)

      const updatedLead= await this.campaignLeadService.updateLeadStatus({
      campaignId,
      leadId,
      status})

      res.status(204).json(updatedLead)
    } catch (error) {
      next(error)
    }
  }


// Remover lead da campanha
  removeLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId)
      const leadId = Number(req.params.leadId)
      await this.campaignLeadService.removeLead(campaignId, leadId)

      res.status(204).send({message: "Lead removido da campanha com sucesso!"})
    } catch (error) {
      next(error)
    }
  }
}