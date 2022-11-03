import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log("Internal Server Error", error);

  return res.status(500).json("Internal Server Error.");
};
