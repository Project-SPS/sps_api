// import { NextFunction, Request, Response } from "express";
// import { AppError } from "../errors/AppError";

// export const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
//   if (error instanceof AppError) {
//     return res.status(error.statusCode).json({ message: error.message });
//   }

//   console.log("Internal Server Error", error);

//   return res.status(500).json("Internal Server Error.");
// };

import { Response, Request, NextFunction } from "express"
import { AppError } from "../errors/AppError"


export const handleErrorMiddleware = (err: Error, req: Request, res: Response, next:NextFunction) => {
  console.log("-------", err instanceof AppError)
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
