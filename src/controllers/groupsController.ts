import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsController {
    constructor(private readonly groupsRepository: GroupsRepository) { }

    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupsRepository.find()
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }


    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const group = await this.groupsRepository.findById(id)
            if(!group) throw new HttpError(404, "Grupo não encontrado")

            res.json(group)
        } catch (error) {
            next(error)
        }
    }


    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await this.groupsRepository.create(body)

            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }


    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)

            const body = UpdateGroupRequestSchema.parse(req.body)
            
            const updateGroup = await this.groupsRepository.updateById(id, body)

            if(!updateGroup) throw new HttpError(404, "Grupo não encontrado!")


            res.json(updateGroup)
        } catch (error) {
            next(error)
        }
    }


    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)

            const deleteGroup = await this.groupsRepository.deleteById(id)

            if(!deleteGroup) throw new HttpError(404, "Grupo não encontrado!")

            res.json( {deleteGroup} )
        } catch (error) {
            next(error)
        }
    }
}
    