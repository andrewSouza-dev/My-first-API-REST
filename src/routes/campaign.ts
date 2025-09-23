import { Router } from "express";
import { campaignControll } from "../../containers/compaignContainer";


const routerC = Router()


//ROUTES CAMPAIGN
routerC.get("/", campaignControll.index)
routerC.get("/:id", campaignControll.show)
routerC.post("/", campaignControll.create)
routerC.put("/:id", campaignControll.update)
routerC.delete("/:id", campaignControll.delete)


export { routerC }