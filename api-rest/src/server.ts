import express, {Request, Response, NextFunction} from 'express'
import { routes } from './routes'
import { AppError } from './utils/app-error'
import {ZodError} from 'zod'


const PORT = 3333
const app = express()
app.use(express.json())
app.use(routes)

app.use((error: any, request: Request, response: Response, _: NextFunction) => {
    
    if(error instanceof AppError){
        response.status(error.statusCode).json({message: error.message})
    }
    if(error instanceof ZodError){
        response.status(401).json({message: 'Validation Error', issues: error.format()})
    }
    else {
        response.status(500).json({message: error.message})
    }
    

})

app.listen(PORT, () => console.log(`Server is running pm port ${PORT}`))