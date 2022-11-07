import { Request, Response } from "express";
//import { instanceToPlain } from "class-transformer";
import updateFugitiveService from "../../services/procurados/updateFugitive.services";

const updateFugitiveController = async (req: Request, res: Response) => {
  const body = req.body;
  const { cpf } = req.params;

  const fugitive = await updateFugitiveService(body, cpf);

  return res.status(200).json({ message: "Procurado atualizado!", fugitive });
};

export default updateFugitiveController