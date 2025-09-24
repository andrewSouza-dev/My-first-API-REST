import { GroupLeadsController } from "../src/controllers/GroupLeadsController";
import { PrismaGroupRepository } from "../src/repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository";
import { GroupLeadService } from "../src/services/GroupLeadService";


// CONTAINER GroupsLeads
export const groupsRepository = new PrismaGroupRepository()
export const leadsRepository = new PrismaLeadsRepository()
export const groupLeadService = new GroupLeadService(groupsRepository, leadsRepository)
export const groupLeadControll = new GroupLeadsController(groupLeadService)