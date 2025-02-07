import { Router } from "express";
import { productsRouter } from "./products-router";
import {tableRouter} from "./tables-routes"
import { tablesSessionRouter } from "./tables-session-routes";
import { orderRouter } from "./order-routes";

const router = Router()

router.use("/products", productsRouter)
router.use("/tables", tableRouter)
router.use("/tables-session", tablesSessionRouter)
router.use("/order", orderRouter)
export{router}