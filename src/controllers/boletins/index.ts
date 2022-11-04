import { Request, Response } from "express";
import { start } from "repl";
import { AppError } from "../../errors/AppError";
import {
  IBoletimRequest,
  IBoletimUpdateRequest,
} from "../../interfaces/boletim.interfaces";
import createBulletinService from "../../services/boletim/createBulletin.services";
import updateBulletinService from "../../services/boletim/updateBulletin.services";
import listBulletinCitizenService from "../../services/boletim/listBulletinCitizen.services";
import listBulletinVehicleService from "../../services/boletim/listBulletinVehicle.services";
import listBulletinService from "../../services/boletim/listBulletin.services";

const createBulletinController = async (req: Request, res: Response) => {
  const data: IBoletimRequest = req.body;
  const create = await createBulletinService(data);
  return res.status(201).json(create);
};

const updateBulletinController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IBoletimUpdateRequest = req.body;
  const update = await updateBulletinService(data, id);
  return res.status(201).json(update);
};

const listBulletinCitizenController = async (req: Request, res: Response) => {
  const cpf: string = req.params.cpf;
  const list = await listBulletinCitizenService(cpf);
  return res.status(200).json(list);
};

const listBulletinVehicleController = async (req: Request, res: Response) => {
  try {
    const placa: string = req.params.placa;
    const list = await listBulletinVehicleService(placa);
    return res.status(201).json(list);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const listBulletinController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const bulletin = await listBulletinService(id);
  return res.status(201).json(bulletin);
};

export {
  createBulletinController,
  listBulletinController,
  listBulletinCitizenController,
  listBulletinVehicleController,
  updateBulletinController,
};
