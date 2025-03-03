import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Request, Response } from "express"
import { authConfig } from "@/configs/auth"
import { SignOptions } from "jsonwebtoken"

class SessionController {
   async create(request: Request, response: Response){
        const {email, password} = request.body

        const user = await prisma.user.findFirst({where: {email}})
        if(!user){
            throw new AppError("Invalid email or password")
        }

        const passwordMatched = await compare(password, user.password)
        if(!passwordMatched){
            throw new AppError("Invalid email or password")
        }

        const { secret, expiresIn} = authConfig.jwt
        
        const token = sign({role: user.role},secret,{subject: user.id, expiresIn})

        const {password: hashedPassword, ...userWhithoutPassword} = user


        response.json({token: token, user: userWhithoutPassword})
    }
}

export {SessionController}