import { Request, Response } from "express";
import updatePolicialService from "../../services/policiais/updatePolicial.services";
import { IPolicialUpdate } from "../../interfaces/policial.interfaces";

const updatePolicialController = async (req: Request, res: Response) => {

    const police: IPolicialUpdate = req.body;
    
    const id = req.params.id;

    const updatePolice = await updatePolicialService(id, police);

    return res.status(204).json(updatePolice);
}

export default updatePolicialController;