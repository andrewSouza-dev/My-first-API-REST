import { Router } from "express";
import { leadsController } from "../controllers/leadsController";


const routerL = Router()

const leadControll = new leadsController()


// ROUTES LEADS
routerL.get("/", leadControll.index)
routerL.get("/:id", leadControll.show) 
routerL.post("/", leadControll.create)
routerL.put("/:id", leadControll.update)
routerL.delete("/:id", leadControll.delete)




export { routerL }