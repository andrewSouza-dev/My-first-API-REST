import { Router } from "express";
import { groupsController } from "../../containers/groupContainer";


const routerG = Router()


// ROUTES GROUPS
routerG.get("/", groupsController.index)
routerG.get("/:id", groupsController.show)
routerG.post("/", groupsController.create)
routerG.put("/:id", groupsController.update)
routerG.delete("/:id", groupsController.delete)


export { routerG }
