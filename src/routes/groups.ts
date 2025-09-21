import { Router } from "express";
import { GroupsController } from "../controllers/groupsController";


const routerG = Router()

const groupsController = new GroupsController()


// ROUTES GROUPS
routerG.get("/", groupsController.index)
routerG.get("/:id", groupsController.show)
routerG.post("/", groupsController.create)
routerG.put("/", groupsController.update)
routerG.delete("/", groupsController.delete)



export { routerG }
