import {Request, Response, NextFunction} from "express"
import {knex} from "../database/knex"
import z from "zod"
import { AppError } from "@/utils/app-error"

export class OrderController {
    async index (request: Request, response:Response, next:NextFunction){
        try {
            const {table_session_id} = request.params
            const order = await knex("order")
            .select(
                "order.id",
                "order.product_id",
                "order.table_session_id",
                "products.name",
                "order.price",
                "order.quantity",
                knex.raw('"order".price * "order".quantity AS total'),
                "order.created_at",
                "order.updated_at"
            )
            .join("products","products.id", "product_id")
            .where({table_session_id})
            .orderBy("order.created_at", "desc")

            return response.status(201).json(order)
        } catch (error) {
            next(error)
        }
    }
    async create (request:Request, response:Response, next:NextFunction){
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number()
    
            })
    
            const {table_session_id, product_id, quantity} = bodySchema.parse(request.body)

            const session = await knex<TableSessionsRepository>("table_sessions").select().where({id: table_session_id}).orderBy("closed_at").first()

            const products = await knex<ProductRepository>("products").where({id: product_id}).first()

            if(!session){
                throw new AppError ("session table not found")
            }

            if(session.closed_at){
                throw new AppError ("this table is closed")
            }

            if(!products){
                throw new AppError("products is not found")
            }

            await knex<OrderRepository>("order").insert({table_session_id, product_id, quantity, price: products.price})
            response.status(201).json()
        } catch (error) {
            next(error)
        }


    }
    async show(request:Request, response:Response, next:NextFunction){
        try {
            const {table_session_id} = request.params

            const show = await knex("order").select(knex.raw('COALESCE(SUM("order".price * "order".quantity),0) AS total'), knex.raw('COALESCE(SUM("order".quantity),0) AS qtd_total')).join("products", "products.id", "product_id").where({table_session_id})
            response.json(show)
        } catch (error) {
            next(error)
        }
    }
}

