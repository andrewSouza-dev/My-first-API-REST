import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignRepository } from "../repositories/CampaignRepository";

export class CaimpaignController {
  constructor(private readonly campaignRepository: CampaignRepository) { }
  
    index: Handler = async (req, res, next) => {
      try {
        const campaigns = await this.campaignRepository.find()

        res.json(campaigns)
      } catch (error) {
        next(error)
      }
    }



    show: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)

        const campaign = await this.campaignRepository.findById(+req.params.id)
      
        if(!campaign) throw new HttpError (404, "Campaign não encontrado!")

        res.json(campaign)
      } catch (error) {
        next(error)
      }
    }



    create: Handler = async (req, res, next) => {
      try {
       const body = CreateCampaignRequestSchema.parse(req.body)

       const newCampaing = await this.campaignRepository.create(body)

       res.status(201).json(newCampaing)
      } catch (error) {
        next(error)
      }
    }



    update: Handler = async (req, res, next) => {
      try {
       const id = Number(req.params.id)
       const body = UpdateCampaignRequestSchema.parse(req.body)

       const updateCampaing = await this.campaignRepository.updateById(id, body)
       
       if(!updateCampaing) throw new HttpError(404, "Campaign não encontrado!")

       res.json(updateCampaing)
      } catch (error) {
        next(error)
      }
    }



    delete: Handler = async (req, res, next) => {
      try {
        const id = Number(req.params.id)

        const deleteCampaign = await this.campaignRepository.deleteById(id)
        
        if(!deleteCampaign) throw new HttpError(404, "Camapaign não encontrado!")
 
        res.json({ deleteCampaign })
      } catch (error) {
        next(error)
      }
    }
}