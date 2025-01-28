import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import {z} from "zod"
export class ProductsController {
    /**
     * index  lista todos os dados
     * show exibe um determinado dado
     * create cria um dado
     * update atualiza um dado da ista
     * remove remove um dado da lista
     */

    index(request: Request, response: Response){
        const {page, limit} = request.query
        
        response.send(`Página ${page} limite ${limit}`)
    }

    create(request: Request, response: Response){
        /*
        const {name, price} = request.body
                
        if (!name) {
            throw new AppError("Nome do produto é obrigatório")
        }
        if (name.trim().length < 7){
            throw new AppError("Nome do produto deve ser maior do que 6 caracteres")
        }

        if (!price){
            throw new AppError("Preço do produto é obrigatório")
        }
        if (price < 0){

            throw new AppError("Preço deve ser maior do que 0")
        }

        */

        const schemaValidation = z.object({
            name: z.string({required_error: "Name is required"}).trim().min(6, {message: "Name must be 6 or more characters"}),
            price: z.number({required_error: "Price is required"}).positive({message: "Price must be positive"})
        })

        const {name, price} = schemaValidation.parse(request.body)
        
        response.status(201). json({name, price, user_id: request.user_id})
    }
}