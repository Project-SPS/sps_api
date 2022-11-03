import { Request, Response } from "express";
import listPoliciaisService from "../../services/policiais/listPoliciais.services";

const listPoliciaisController = async (req: Request, res: Response) => {

    const listPolices = await listPoliciaisService();

    return res.status(200).json(listPolices);
}

export default listPoliciaisController;