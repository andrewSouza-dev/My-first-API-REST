import { GroupsController } from "../src/controllers/groupsController";
import { PrismaGroupRepository } from "../src/repositories/prisma/PrismaGroupsRepository";
import { GroupServices } from "../src/services/GroupService";


// CONTAINER Groups
export const groupsRepository = new PrismaGroupRepository()
export const groupsService = new GroupServices(groupsRepository)
export const groupsController = new GroupsController(groupsService)