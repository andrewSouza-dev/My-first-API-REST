import { Router } from "express";
import { campaignLeadsControll } from "../../containers/compaignLeadContainer";


const routerCL = Router()


// ROUTES CampaignsLeads
routerCL.get("/", campaignLeadsControll.getLeads)
routerCL.post("/", campaignLeadsControll.addLead)
routerCL.put("/:leadId", campaignLeadsControll.updateLeadStatus)
routerCL.delete("/:leadId", campaignLeadsControll.removeLead)


export { routerCL }