import { Router } from "express";
import { userRouter } from "./user-routes.routes";
import { sessionRouter } from "./sessions-routes.routes";
import { deliveriesRoutes } from "./deliveries-routes.routes";
import { deliveriesLogsRouter } from "./deliveries-logs-routes.routes";

const router = Router()

router.use("/user", userRouter)
router.use("/session", sessionRouter)
router.use("/deliveries", deliveriesRoutes)
router.use("/deliveries-logs", deliveriesLogsRouter)

export { router }