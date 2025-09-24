import { GroupLeadsController } from "../src/controllers/GroupLeadsController";
import { PrismaGroupRepository } from "../src/repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository";


// CONTAINER GroupsLeads
export const groupsRepository = new PrismaGroupRepository()
export const leadsRepository = new PrismaLeadsRepository()
export const groupLeadControll = new GroupLeadsController(groupsRepository, leadsRepository)