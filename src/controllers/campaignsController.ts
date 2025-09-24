import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignServices } from "../services/CampaignService";

export class CaimpaignController {
  constructor(private readonly campaignService: CampaignServices) { }
  
    index: Handler = async (req, res, next) => {
      try {
        const allCampaigns = await this.campaignService.getAllCampaigns()
        res.json(allCampaigns)
      } catch (error) {
        next(error)
      }
    }



    show: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)
        const campaign = await this.campaignService.show(id)
        res.json(campaign)
      } catch (error) {
        next(error)
      }
    }



    create: Handler = async (req, res, next) => {
      try {
       const body = CreateCampaignRequestSchema.parse(req.body)
       const newCampaing = await this.campaignService.create(body)
       res.status(201).json(newCampaing)
      } catch (error) {
        next(error)
      }
    }



    update: Handler = async (req, res, next) => {
      try {
       const id = Number(req.params.id)
       const body = UpdateCampaignRequestSchema.parse(req.body)
       const updatedCampaign = await this.campaignService.update(id, body)
       res.json(updatedCampaign)
      } catch (error) {
        next(error)
      }
    }



    delete: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)
        const deletedCampaign = await this.campaignService.delete(id)
        res.json({ deletedCampaign })
      } catch (error) {
        next(error)
      }
    }
}