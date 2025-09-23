import { Router } from "express";
import { leadControll } from "../../containers/leadContainer";

const routerL = Router()


// ROUTES LEADS
routerL.get("/", leadControll.index)
routerL.get("/:id", leadControll.show) 
routerL.post("/", leadControll.create)
routerL.put("/:id", leadControll.update)
routerL.delete("/:id", leadControll.delete)


export { routerL }