import { Router } from "express"
import { myMiddleware } from '../middleware/my-middleware'
import { ProductsController } from "../controller/products-controller"

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.use(myMiddleware)

productsRoutes.get("/", productsController.index)

productsRoutes.post("/", productsController.create)

export {productsRoutes}