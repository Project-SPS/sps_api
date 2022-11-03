import { Request, Response } from "express";
import {
  ICitizenVehiclesRequest,
  ICreateVehicleFineRequest,
  IVehicleRequest,
} from "../../interfaces/veiculo.interfaces";
import createVehicleFineService from "../../services/veiculos/createVehicleFine.service";
import listCitizenVehiclesService from "../../services/veiculos/listCitizenVehicles.service";
import listVehicleFinesService from "../../services/veiculos/listVehicleFines.service";
import retrieveVehicleService from "../../services/veiculos/retrieveVehicle.service";

const retrieveVehicleController = async (req: Request, res: Response) => {
  const data: IVehicleRequest = req.body;
  const veiculo = await retrieveVehicleService(data);
  return res.status(200).json(veiculo);
};

const listCitizenVehiclesController = async (req: Request, res: Response) => {
  const { cpf }: ICitizenVehiclesRequest = req.body;
  const vehicles = await listCitizenVehiclesService(cpf);
  return res.status(200).json(vehicles);
};

const listVehicleFinesController = async (req: Request, res: Response) => {
  const data: IVehicleRequest = req.body;
  const fines = await listVehicleFinesService(data);
  return res.status(200).json(fines);
};

const createVehicleFineController = async (req: Request, res: Response) => {
  const { placa, chassi, multaId }: ICreateVehicleFineRequest = req.body;
  await createVehicleFineService({ placa, chassi }, multaId);
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
