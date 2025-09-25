import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadsStatus, LeadWhereParams } from "../repositories/LeadRepository";

interface GetLeadsWithPagination {
    page?: number
    pageSize?: number
    name?: string
    status?: LeadsStatus
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
    groupId: number
     
}


export class GroupLeadService {
    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ) {}

    async allLeadsGroup (params: GetLeadsWithPagination) {
      const { name, status, page = 1, pageSize = 10, sortBy, order} = params
        
      const limit = pageSize
      const offset = (page - 1) * limit
      
      const where: LeadWhereParams = {  } 

      
      if (name) where.name = { like: name, mode: "insensitive" }
      if (status) where.status =  status 
        
      const leads = await this.leadsRepository.find({ 
        where, 
        sortBy, 
        order, 
        limit, 
        offset,
        include: { groups: true} })
      
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
  

    async addLead (groupId: number, leadId: number) {
       const group = await this.groupsRepository.findById(groupId);
       if (!group) throw new Error("Grupo não encontrado");
       
       const newLeadGroup = await this.groupsRepository.addLead(groupId, leadId)
       return newLeadGroup

    }


    async removeLead (groupId: number, leadId: number) {
       const removedLead = await this.groupsRepository.removeLead(groupId, leadId)
       return  removedLead
    }
}