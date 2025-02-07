import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";
import z from "zod";
import {knex} from "../database/knex"
export class ProductsController {
    
    async index (request: Request, response:Response, next: NextFunction){
        try {
            const {name} = request.query
            const products = await knex("products")
            .select()
            .whereLike("name", `%${name ?? ""}%`)
            .orderBy("name")

            response.json(products)
        } catch (error) {
            next(error)
        }
    }

    async create (request: Request, response:Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0,{message: "value must be greater than 0"})

            })
            const {name, price} = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").insert({name:name, price:price})
            response.json()
        } catch (error) {
            next(error)
        }
    }

    async update (request: Request, response:Response, next: NextFunction){
        try {
            const id = z.string().transform((value)=> Number(value)).refine((value)=> !isNaN(value),{message: "id must be a number"}).parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0,{message: "value must be greater than 0"})
    
            })
            const {name, price} = bodySchema.parse(request.body)
    
            await knex<ProductRepository>("products").update({name:name, price:price, updated_at: knex.fn.now()}).where("id", "=", id)
    
            return response.json()
            
        } catch (error) {
            next(error)
        }


    }

    async remove (request: Request, response: Response, next: NextFunction){
        try {
            const id = z.string().transform((value)=> Number(value)).refine((value)=>!isNaN(value), {message: "Id must be a Number"}).parse(request.params.id)
            
            const products = await knex<ProductRepository>("products").select().where("id", "=", id).first()
            
            if(!products){
                throw new AppError("Product Not Found")
            }

            await knex<ProductRepository>("products").delete().where("id", "=", id)
            response.json()

        } catch (error) {
            next(error)
        }
    }
}