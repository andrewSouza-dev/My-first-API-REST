import { Router } from "express";
import { GroupLeadsController } from "../controllers/GroupLeadsController";

export const RouterGL = Router()

const groupLeadControll = new GroupLeadsController


// ROUTES GroupsLeads
RouterGL.get("/groups/:groupId/leads", groupLeadControll.getAllLeads)
RouterGL.post("/groups/:groupId/leads", groupLeadControll.addLead)
RouterGL.delete("/groups/:groupId/leads/:leadId", groupLeadControll.removeLead)