import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const handleErrorMiddleware = (err: Error, req: Request, res: Response, next:NextFunction) => {
  console.log("instaceof ---", err instanceof AppError)
  if (err instanceof AppError) {
    console.log("instace de apperror", err)
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error!"
  })
}

