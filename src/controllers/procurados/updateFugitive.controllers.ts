import { Request, Response } from "express";
//import { instanceToPlain } from "class-transformer";
import updateFugitiveService from "../../services/procurados/updateFugitive.services";

const updateFugitiveController = async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;

  const fugitive = await updateFugitiveService(body, id);

  return res.status(200).json(fugitive);
};

export default updateFugitiveController;
