import { Request, Response } from "express";
import { IPolicialRequest } from "../../interfaces/policial.interfaces";
import createPolicialService from "../../services/policiais/createPolicial.services";

const createPolicialController = async (req: Request, res: Response) => {

    const police: IPolicialRequest = req.body;

    const createPolice = await createPolicialService(police);

    const { senha, ...createPoliceRest } = createPolice;

    return res.status(201).send(createPoliceRest);
}

export default createPolicialController;