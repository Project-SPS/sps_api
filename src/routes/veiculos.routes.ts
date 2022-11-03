import { Router } from "express";
import {
  createVehicleFineController,
  listCitizenVehiclesController,
  listVehicleFinesController,
  retrieveVehicleController,
} from "../controllers/veiculos";

const veiculosRoutes = Router();

veiculosRoutes.get("/:identifier", retrieveVehicleController);
veiculosRoutes.get("/cidadao/:cpf", listCitizenVehiclesController);
veiculosRoutes.get("/multas/:identifier", listVehicleFinesController);
veiculosRoutes.post("/multas/:identifier", createVehicleFineController);

export default veiculosRoutes;
