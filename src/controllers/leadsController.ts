import { Handler } from "express";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema,} from "./schemas/LeadsRequestSchema";
import { LeadsServices } from "../services/LeadsService";


export class leadsController {
  constructor(private readonly leadService: LeadsServices) {}
  
  
  index: Handler = async (req, res, next) => {
    try {
      const query = GetLeadsRequestSchema.parse(req.query)
      const { page = "1", pageSize = "10"} = query
  
      const result = await this.leadService.getAllLeadsPaginated({
        ...query,
        page: +page,
        pageSize: +pageSize,
      })
      res.json(result)
    } catch (error) {
      next(error)
    }
  }


  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body)
      const newLead = await this.leadService.CreateLead(body)
      res.status(201).json(newLead)
    } catch (error) {
      next(error)
    }
  }


  show: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const lead = await this.leadService.getLeadById(id)
      res.json(lead)
    } catch (error) {
      next(error)
    }
  }


  update: Handler = async (req, res, next) => {
     try {
      const id = Number(req.params.id)
      const body = UpdateLeadRequestSchema.parse(req.body) 
      const updatedLead = await this.leadService.updateLead(id, body)
      res.json(updatedLead)
     } catch (error) {
        next(error)
     }
  }
    
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const deletedLead = await this.leadService.deleteLead(id)

      res.json( {deletedLead} )
      } catch (error) {
        next(error)
      }
  }
}   
    
    
  