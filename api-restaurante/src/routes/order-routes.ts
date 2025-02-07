import { OrderController } from "@/controller/order-controller";
import { Router } from "express";

const orderRouter = Router()
const controller = new OrderController

orderRouter.get("/table-session/:table_session_id", controller.index)
orderRouter.post("/", controller.create)
orderRouter.get("/table-session/:table_session_id/total", controller.show)

export {orderRouter}