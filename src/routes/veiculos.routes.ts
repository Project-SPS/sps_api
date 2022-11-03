import { Router } from "express";
import {
  createVehicleFineController,
  listCitizenVehiclesController,
  listVehicleFinesController,
  retrieveVehicleController,
} from "../controllers/veiculos";

const veiculosRouter = Router();

veiculosRouter.get("", retrieveVehicleController);
veiculosRouter.get("/cidadao", listCitizenVehiclesController);
veiculosRouter.get("/multas", listVehicleFinesController);
veiculosRouter.post("/multas", createVehicleFineController);

export default veiculosRouter;
