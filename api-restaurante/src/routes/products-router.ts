import { ProductsController } from "@/controller/products-controller";
import { Router } from "express";

const productsRouter = Router()
const controller = new ProductsController

productsRouter.get("/", controller.index)
productsRouter.post("/", controller.create)
productsRouter.put("/:id", controller.update)
productsRouter.delete("/:id", controller.remove)

export {productsRouter}