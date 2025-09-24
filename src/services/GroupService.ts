import { HttpError } from "../errors/HttpError"
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository"


export class GroupServices {
    constructor(private readonly groupsRepository: GroupsRepository ) {}

    async getAllGroups (){
        const allGroups = await this.groupsRepository.find()
        return allGroups
    }

    async show (id: number) {
       const group = await this.groupsRepository.findById(id)
       if(!group) throw new HttpError(404, "Grupo não encontrado")
       return group
    }


    async create (params: CreateGroupAttributes) {
       const newGroup = await this.groupsRepository.create(params)
       return newGroup
    }


    async update (id: number, params: Partial<CreateGroupAttributes>) {
        const group = await this.groupsRepository.findById(id)
        if(!group) throw new HttpError(404, "Grupo não encontrado!")

        const updateGroup = await this.groupsRepository.updateById(id, params)
        return updateGroup
    }


    async delete (id: number) {
        const group = this.groupsRepository.findById(id)
        if(!group) throw new HttpError(404, "Grupo não encontrado!")

        const deleteGroup = await this.groupsRepository.deleteById(id)
        return deleteGroup
    }
    
}