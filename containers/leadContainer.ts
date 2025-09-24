import { leadsController } from "../src/controllers/leadsController"
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository"
import { LeadsServices } from "../src/services/LeadsService"


// CONTAINER Leads
export const leadsRepository = new PrismaLeadsRepository()
export const leadService = new LeadsServices(leadsRepository)
export const leadControll = new leadsController(leadService)