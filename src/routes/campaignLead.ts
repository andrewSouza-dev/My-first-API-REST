import { Router } from "express";
import { campaignLeadsControll } from "../../containers/compaignLeadContainer";


const routerCL = Router()


// ROUTES CampaignsLeads
routerCL.post("/campaigns/:campaignId/leads", campaignLeadsControll.addLead)
routerCL.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsControll.updateLeadStatus)
routerCL.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsControll.removeLead)


export { routerCL }