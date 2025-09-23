import { leadsController } from "../src/controllers/leadsController"
import { PrismaLeadsRepository } from "../src/repositories/prisma/PrismaLeadsRepository"


// CONTAINER Leads
export const leadsRepository = new PrismaLeadsRepository
export const leadControll = new leadsController(leadsRepository)