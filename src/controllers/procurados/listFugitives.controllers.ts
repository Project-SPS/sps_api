import { Request, Response } from "express";
import listFugitivesServices from "../../services/procurados/listFugitives.services";

const listFugitivesController = async (req: Request, res: Response) => {
  const fugitives = await listFugitivesServices();

  return res.status(200).json(fugitives);
};

export default listFugitivesController;
