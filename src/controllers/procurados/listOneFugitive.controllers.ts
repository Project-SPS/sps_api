import { Request, Response } from "express";
import listOneFugitiveService from "../../services/procurados/listOneFugitive.services";

const listOneFugitiveController = async (req: Request, res: Response) => {
  const { cpf } = req.params;

  const fugitive = await listOneFugitiveService(cpf);

  return res.status(200).json(fugitive);
};

export default listOneFugitiveController;
