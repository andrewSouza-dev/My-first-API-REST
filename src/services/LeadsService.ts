import { HttpError } from "../errors/HttpError"
import { CreateLeadAttributes, LeadsRepository, LeadsStatus, LeadWhereParams } from "../repositories/LeadRepository"

interface GetLeadsWithPaginationParams {
    page?: number
    pageSize?: number
    name?: string
    status?: LeadsStatus
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
     
}



export class LeadsServices {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  async getAllLeadsPaginated(params: GetLeadsWithPaginationParams) {

    const { name, status, page = 1, pageSize = 10, sortBy, order} = params

    const limit = pageSize
    const offset = (page - 1) * limit

    const where: LeadWhereParams = {}

    if (name) where.name = { like: name, mode: "insensitive" }
    if (status) where.status = status


    const leads = await this.leadsRepository.find({ where, sortBy, order, limit, offset })
    const total = await this.leadsRepository.count(where)

    return {
      leads,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    }
  }


  async CreateLead(params: CreateLeadAttributes) {
    if (!params.status) params.status = "New"
    const newLead = await this.leadsRepository.create(params)
    return newLead
  }


  async getLeadById(id: number) {
    const lead = await this.leadsRepository.findById(id)
    if (!lead) throw new HttpError(404, "lead não encontrado")
    return lead
    
    
  }

  async updateLead(leadId: number, params: Partial<CreateLeadAttributes>) {
    const lead = await this.leadsRepository.findById(leadId)
    if(!lead) throw new HttpError(404, "Lead não encontrado!")
    
    if(lead.status === "New" && params.status !== undefined && params.status!== "Contacted") {
      throw new HttpError(400, "Um novo lead deve ser contatado antes de ter o seu status atualizado para outros valores!")
    }
    
    if(params.status && params.status === "Archived") {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if(diffDays < 180) throw new HttpError(400, "Um lead só pode ser arquivado após 6 meses de inatividade!")
    }
              
    const updatedLead = await this.leadsRepository.updateById(leadId, params)

    return updatedLead
  }

  
  async deleteLead(leadId: number) {
    const leadExist = await this.leadsRepository.findById(leadId)
    if (!leadExist) throw new HttpError(404, "Lead não encontrado!")

    return leadExist
  }
  
}

