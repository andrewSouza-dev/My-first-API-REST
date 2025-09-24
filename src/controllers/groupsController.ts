import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { GroupServices } from "../services/GroupService";

export class GroupsController {
    constructor(private readonly groupsService: GroupServices) { }

    index: Handler = async (req, res, next) => {
        try {
            const allGroups = await this.groupsService.getAllGroups()
            res.json(allGroups)
        } catch (error) {
            next(error)
        }
    }


    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const group = await this.groupsService.show(id)
            res.json(group)
        } catch (error) {
            next(error)
        }
    }


    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await this.groupsService.create(body)
            res.status(201).json(newGroup)
        } catch (error) {
            next(error)
        }
    }


    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const body = UpdateGroupRequestSchema.parse(req.body)
            const updateGroup = await this.groupsService.update(id, body)
            res.json(updateGroup)
        } catch (error) {
            next(error)
        }
    }


    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const deletedGroup = await this.groupsService.delete(id)
            res.json( {deletedGroup} )
        } catch (error) {
            next(error)
        }
    }
}
    