import { NextFunction, Request, Response } from "express";

const verifyIsAdmTokenMiddleware = (request: Request, response: Response, next: NextFunction) => {
  if (!request.user.administrador) {
    return response.status(403).json({ message: "Usuário não autorizado" });
  }

  next();
};

export { verifyIsAdmTokenMiddleware };
