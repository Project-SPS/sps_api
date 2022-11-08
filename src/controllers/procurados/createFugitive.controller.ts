import { Request, Response } from "express";
import createFugitiveServices from "../../services/procurados/createFugitive.services";

const createFugitiveController = async (req: Request, res: Response) => {
  const fugitive = req.body;
  const image = req.file;
  const newFugitive = await createFugitiveServices(fugitive,image);

  return res.status(201).send(newFugitive);
};

export default createFugitiveController;
