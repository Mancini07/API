import { TablesController } from "@/controller/tables-controller";
import { Router } from "express";


const tableRouter = Router()
const controller = new TablesController()

tableRouter.get("/", controller.index)

export {tableRouter}