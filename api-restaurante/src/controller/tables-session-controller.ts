import express, {Request, Response, NextFunction } from "express"
import z from "zod"
import {knex} from "../database/knex"
import { AppError } from "@/utils/app-error"

export class TablesSessionController {
    async index (request: Request, response: Response, next: NextFunction){
        try {
            const sessions = await knex<TableSessionsRepository>("table_sessions").orderBy("closed_at")

            return response.status(201).json(sessions)
            
        } catch (error) {
            next(error)
        }

    }
    async create (request: Request, response:Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })

            const {table_id} = bodySchema.parse(request.body)

            const sessions = await knex<TableSessionsRepository>("table_sessions").where({table_id}).orderBy("closed_at").first()

            if(sessions && !sessions.closed_at){
                throw new AppError("this table is already open")
            }

            await knex<TableSessionsRepository>("table_sessions").insert({table_id,opened_at: knex.fn.now()})
            return response.status(201).json()


        } catch (error) {
            next(error)
        }

    }
    async update(request:Request, response:Response, next: NextFunction){
        try {
            const id = z.string().transform((value)=>Number(value)).refine((value)=>!isNaN(value), {message: "Id must be a number"}).parse(request.params.id)

            const sessions = await knex("table_sessions").where({id}).first()

            if(!sessions){
                throw new AppError("Session table not found")
            }
    
            if(sessions.closed_at){
                throw new AppError("This session table is already closed")
            }
    
            await knex<TableSessionsRepository>("table_sessions").update({closed_at: knex.fn.now()}).where({id})
            return response.status(201).json()
        } catch (error) {
            next(error)
        }

    }

}