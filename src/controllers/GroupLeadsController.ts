import { Handler } from "express";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchema";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { GroupLeadService } from "../services/GroupLeadService";

export class GroupLeadsController {
  constructor(
    private readonly groupsService: GroupLeadService) {}


  getAllLeads: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId)
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10"} = query
      
      const result = await this.groupsService.allLeadsGroup({
        ...query,
        page: +page,
        pageSize: +pageSize,
        groupId,
      })
      res.json(result)      
    }catch (error) {
        next(error)
    }}
        
    
  addLead: Handler = async (req, res, next) => {
    try {
        const groupId = Number(req.params.groupId)
        const { leadId } = AddLeadRequestSchema.parse(req.body)

        const newLeadGroup = await this.groupsService.addLead(groupId, leadId)
        res.status(201).json(newLeadGroup)
    } catch (error) {
        next(error)
    }
  }


  removeLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId)
      const leadId = Number(req.params.leadId)
      const removeLeadGroup = await this.groupsService.removeLead(groupId, leadId)
      res.json( {removeLeadGroup} )

    } catch (error) {
        next(error)
    }
  }
}