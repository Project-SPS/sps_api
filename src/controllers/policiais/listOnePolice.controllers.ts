import { Request, Response } from "express";
import listOnePoliciaisService from "../../services/policiais/listOnePolicial.services";

const listOnePoliciaisController = async (req: Request, res: Response) => {

    const { cod_registro } = req.params

    const listOnePolice = await listOnePoliciaisService(cod_registro);

    return res.status(200).json(listOnePolice);
}

export default listOnePoliciaisController;