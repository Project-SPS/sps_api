import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { MixedSchema } from "yup/lib/mixed";

export const verifySerialization = (serializer: MixedSchema) => async (req: Request, res: Response, next: NextFunction) => {
  await serializer
    .validate(req.body, { stripUnknown: true })
    .then((value) => {
      req.body = value;
      next();
    })
    .catch((error: ValidationError) => {
      return res.status(400).json({ message: error.errors[0] });
    });
};
