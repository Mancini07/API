import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";
class DeliveriesLogsController {
    async create(request: Request, response: Response) {
        const bodyShema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        })

        const { delivery_id, description } = bodyShema.parse(request.body)

        const delivery = await prisma.deliveries.findUnique({where: {id: delivery_id}})

        if (!delivery) {
            throw new AppError("Delivery not found", 404)
        }
        if(delivery.status === "delivered"){
            throw new AppError("This order has already been delivered")
        }

        if(delivery.status === "processing"){
            throw new AppError("Change status to shipped")
        }
        await prisma.deliveriesLog.create({data: {deliveryId: delivery_id, description}})
        response.status(201).json()
    }
    async show (request: Request, response: Response){
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        })

        const {delivery_id} = paramsSchema.parse(request.params)

        const delivery = await prisma.deliveries.findUnique({where: {id: delivery_id}, include: {Deliveries_log: true, user: {select: {name: true, email: true}}}})

        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("the user can only view their deliveries", 401)
        }

        response.json(delivery)
    }
}

export { DeliveriesLogsController };