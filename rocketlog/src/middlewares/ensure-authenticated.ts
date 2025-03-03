import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
    role: string;
    sub: string;    
}

function ensureAuthenticated (request: Request, response: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization
        
        if(!authHeader){
            throw new AppError("JWT Token not found", 401)
        }
        const [ , token] = authHeader.split(" ")

        const {sub: user_id, role} = verify(token, authConfig.jwt.secret) as TokenPayload

        request.user = {id: user_id, role}

        return next()
        
    } catch (error) {
        console.log("authHeader")
        throw new AppError("Invalid JWT Token", 401)
    }
}

export {ensureAuthenticated}