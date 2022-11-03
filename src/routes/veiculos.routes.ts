import { Router } from "express";
import {
  createVehicleFineController,
  listCitizenVehiclesController,
  listVehicleFinesController,
  retrieveVehicleController,
} from "../controllers/veiculos";

const veiculosRoutes = Router();

veiculosRoutes.get("", retrieveVehicleController);
veiculosRoutes.get("/cidadao", listCitizenVehiclesController);
veiculosRoutes.get("/multas", listVehicleFinesController);
veiculosRoutes.post("/multas", createVehicleFineController);

export default veiculosRoutes;
