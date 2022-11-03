import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from '../errors/AppError'

const verifyAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if(!token){
        throw new AppError("Invalid token", 401);
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if(error){
            return res.status(401).json({
                message: 'Invalid token'
            })
        }

        req.user = {
            administrador: decoded.administrador,
            cod_registro: decoded.cod_registro,
            id: decoded.id
        }

        return next()

    })

}

export default verifyAuthMiddleware;