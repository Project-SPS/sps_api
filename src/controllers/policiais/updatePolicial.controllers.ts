import { Request, Response } from "express";
import updatePolicialService from "../../services/policiais/updatePolicial.services";
import { IPolicialUpdate } from "../../interfaces/policial.interfaces";

const updatePolicialController = async (req: Request, res: Response) => {
  const police: IPolicialUpdate = req.body;

  const { cod_registro } = req.params;

  const updatePolice = await updatePolicialService(cod_registro, police);

  return res.status(200).json(updatePolice);
};

export default updatePolicialController;
