import { Request, Response } from "express";
import deletePolicialService from "../../services/policiais/deletePolicial.services";

const deletePolicialController = async (req: Request, res: Response) => {

    const id = req.params.id;

    const deletePolice = deletePolicialService(id);

    return res.status(204).send(deletePolice);
}

export default deletePolicialController;
