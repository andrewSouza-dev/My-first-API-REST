import { Router } from "express";
import { groupLeadControll } from "../../containers/groupLeadContainer";

export const routerGL = Router()


// ROUTES GroupsLeads
routerGL.get("/", groupLeadControll.getAllLeads)
routerGL.post("/", groupLeadControll.addLead)
routerGL.delete("/:leadId", groupLeadControll.removeLead)