import { NextFunction, Request, Response } from "express";

const verifyCanUpdateMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { cod_registro } = request.user;

  if (request.user.cod_registro !== cod_registro && !request.user.administrador) {
    return response.status(403).json({ message: "Usuário não autorizado" });
  }

  if (!request.user.administrador) {
    if (request.body.patente !== undefined || request.body.administrador !== undefined) {
      return response.status(403).json({ message: "Usuário não autorizado" });
    }
  }
  return next();
};

export { verifyCanUpdateMiddleware };
