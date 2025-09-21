import { Router } from "express";
import { CaimpaignController } from "../controllers/campaignsController";

const routerC = Router()
const caimpaignControll = new CaimpaignController


//ROUTES CAMPAIGN
routerC.get("/", caimpaignControll.index)
routerC.get("/:id", caimpaignControll.show)
routerC.post("/", caimpaignControll.create)
routerC.put("/:id", caimpaignControll.update)
routerC.delete("/:id", caimpaignControll.delete)


export { routerC }