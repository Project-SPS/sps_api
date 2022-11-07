import { Request, Response } from "express";
import createFugitiveServices from "../../services/procurados/createFugitive.services";

const createFugitiveController = async (req: Request, res: Response) => {
  const fugitive = req.body;

  const newFugitive = await createFugitiveServices(fugitive);

  return res.status(201).send(newFugitive);
};

export default createFugitiveController;
