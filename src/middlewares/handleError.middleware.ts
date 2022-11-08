import { Response, Request, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
export const handleErrorMiddleware = (
 error: Error | AppError,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 if (error instanceof AppError) {
  return res.status(error.statusCode).json({ message: error.message })
 }
 return res.status(500).json('Internal Server Error')
}