import { Request, Response } from "express";
import {
  ICitizenVehiclesRequest,
  ICreateVehicleFineRequest,
  IVehicleRequest,
} from "../../interfaces/veiculo.interfaces";
import createVehicleFineService from "../../services/veiculos/createVehicleFine.services";
import listCitizenVehiclesService from "../../services/veiculos/listCitizenVehicles.services";
import listVehicleFinesService from "../../services/veiculos/listVehicleFines.services";
import retrieveVehicleService from "../../services/veiculos/retrieveVehicle.services";

const retrieveVehicleController = async (req: Request, res: Response) => {
  const { identifier } = req.params;
  const veiculo = await retrieveVehicleService(identifier);
  return res.status(200).json(veiculo);
};

const listCitizenVehiclesController = async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const vehicles = await listCitizenVehiclesService(cpf);
  return res.status(200).json(vehicles);
};

const listVehicleFinesController = async (req: Request, res: Response) => {
  const { identifier } = req.params;
  const fines = await listVehicleFinesService(identifier);
  return res.status(200).json(fines);
};

const createVehicleFineController = async (req: Request, res: Response) => {
  const { identifier } = req.params;
  const { multaId }: ICreateVehicleFineRequest = req.body;
  await createVehicleFineService(identifier, multaId);
  return res.status(201).send({
    message: "Vehicle fine created",
  });
};

export {
  retrieveVehicleController,
  listCitizenVehiclesController,
  listVehicleFinesController,
  createVehicleFineController,
};
