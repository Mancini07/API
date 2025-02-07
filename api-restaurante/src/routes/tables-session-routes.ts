import { TablesSessionController } from "@/controller/tables-session-controller"
import {Router} from "express"

const tablesSessionRouter = Router()
const controller = new TablesSessionController

tablesSessionRouter.get("/", controller.index)
tablesSessionRouter.post("/", controller.create)
tablesSessionRouter.patch("/:id", controller.update)

export{tablesSessionRouter}