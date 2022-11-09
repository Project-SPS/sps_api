import { Request, Response } from "express";
import deletePolicialService from "../../services/policiais/deletePolicial.services";

const deletePolicialController = async (req: Request, res: Response) => {
  const { cod_registro } = req.params;

  await deletePolicialService(cod_registro);

  return res.status(204).send();
};

export default deletePolicialController;
