import { Lead } from "@prisma/client";
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadRepository";
import { prisma } from "../../database";


export class PrismaLeadsRepository implements LeadsRepository {

  find(params: FindLeadsParams): Promise<Lead[]> {
    return prisma.lead.findMany({
      where: {
        name: {
          contains: params.where?.name?.like,
          equals: params.where?.name?.equals,
          mode: params.where?.name?.mode
        },
          status: params.where?.status,
          groups: {
            some: {
              id: params.where?.groupId
            }
          }
      },
      orderBy: { [params.sortBy ?? "name"]: params.order },
      skip: params.offset,
      take: params.limit,
      include: {
        groups: params.include?.groups,
        campaigns: params.include?.campaigns
      }
    })
  }

  findById(id: number): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: {id},
      include: {
        campaigns: true,
        groups: true
      }
    })
  }

  count(where: LeadWhereParams): Promise<number> {
    return prisma.lead.count({
      where: {
        name: {
          contains: where?.name?.like,
          equals: where?.name?.equals,
          mode: where?.name?.mode
        },
          status: where?.status,
          groups: {
            some: {
              id: where?.groupId,
            }  
          }
      }
    })
  }

  create(attributes: CreateLeadAttributes): Promise<Lead> {
    return prisma.lead.create({ data:attributes })
  }

  updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: attributes
    })
  }

  deleteById(id: number): Promise<Lead> {
    return prisma.lead.delete({where: {id}})
  }
}