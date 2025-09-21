import { Router } from "express";
import { CampaignLeadsController } from "../controllers/CampaignLeadController";


const routerCL = Router()

const campaignLeadsController = new CampaignLeadsController()


// ROUTES CampaignsLeads
routerCL.get("/campaigns/:campaignId/leads", campaignLeadsController.getLeads)
routerCL.post("/campaigns/:campaignId/leads", campaignLeadsController.addLead)
routerCL.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.updateLeadStatus)
routerCL.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.removeLead)


// STATUS
routerCL.get("/status", async (req, res, next) => {
  try {
    res.json({ message: "OK" })
  } catch (error) {
    next(error)
  }
})



export { routerCL }