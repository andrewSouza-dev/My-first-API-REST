import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignRequestSchema";

export class CaimpaignController {
    index: Handler = async (req, res, next) => {
      try {
        const groups = await prisma.campaign.findMany()
        res.json(groups)
      } catch (error) {
        next(error)
      }
    }



    show: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)

        const campaign = await prisma.campaign.findUnique({
           where:   { id },
           include: { 
            leads: {
             include: {
              lead: true
             }
           }}
          })

          if(!campaign) throw new HttpError (404, "Campaign não encontrado!")

        res.json(campaign)
      } catch (error) {
        next(error)
      }
    }



    create: Handler = async (req, res, next) => {
      try {
       const body = CreateCampaignRequestSchema.parse(req.body)

       const newCampaing = await prisma.campaign.create({ data: body})

       res.status(201).json(newCampaing)
      } catch (error) {
        next(error)
      }
    }



    update: Handler = async (req, res, next) => {
      try {
       const id = Number(req.params.id)
       const body = UpdateCampaignRequestSchema.parse(req.body)

       const campaignExists = await prisma.campaign.findUnique({ where: { id } }) 
       if(!campaignExists) throw new HttpError(404, "Campaign não encontrado!")

       const updateCampaing = await prisma.campaign.update({ 
        data: body,
        where: { id }})

       res.json(updateCampaing)
      } catch (error) {
        next(error)
      }
    }



    delete: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)

        const campaignExists = await prisma.campaign.findUnique({ where: { id } })
        if(!campaignExists) throw new HttpError(404, "Camapaign não encontrado!")
 
        const deleteCampaign = await prisma.campaign.delete({ where: { id } })

        res.json({ deleteCampaign })
      } catch (error) {
        next(error)
      }
    }
}