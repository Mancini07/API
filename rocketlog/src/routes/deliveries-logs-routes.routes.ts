import { Router } from "express";
import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller.controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesLogsRouter = Router()
const deliveriesLogsController = new DeliveriesLogsController();

deliveriesLogsRouter.post("/", ensureAuthenticated, verifyUserAuthorization(["sale"]),deliveriesLogsController.create )
deliveriesLogsRouter.get("/:delivery_id/show", ensureAuthenticated, verifyUserAuthorization(["sale", "customer"]),deliveriesLogsController.show )

export {deliveriesLogsRouter}