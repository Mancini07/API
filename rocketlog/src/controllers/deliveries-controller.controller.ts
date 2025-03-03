import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/database/prisma";

class DeliveriesController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),

        })
        const { user_id, description } = bodySchema.parse(request.body);

        await prisma.deliveries.create({data: {userId: user_id, description}})
        response.status(201).json()
    }

    async index (request: Request, response: Response){
        const deliveries = await prisma.deliveries.findMany({include: {user: {select: {name: true, email:true}}}})

        response.status(201).json(deliveries)
    }

}

export { DeliveriesController }