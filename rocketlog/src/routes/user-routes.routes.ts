import { UserController } from "@/controllers/user-controller.controller";
import { Router } from "express";

const userRouter = Router()
const userController = new UserController

userRouter.post("/", userController.create)

export { userRouter }