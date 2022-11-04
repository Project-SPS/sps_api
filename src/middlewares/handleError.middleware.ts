import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppError";
export const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode);
    res.render("error", { error: err });
  }
  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error!",
  });
};
