import { GroupsController } from "../src/controllers/groupsController";
import { PrismaGroupRepository } from "../src/repositories/prisma/PrismaGroupsRepository";


// CONTAINER Groups
export const groupsRepository = new PrismaGroupRepository()
export const groupsController = new GroupsController(groupsRepository)