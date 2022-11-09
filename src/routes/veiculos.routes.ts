import { Router } from "express";
import {
  createVehicleFineController,
  listCitizenVehiclesController,
  listVehicleFinesController,
  retrieveVehicleController,
} from "../controllers/veiculos";
import { verifyAuth, verifySerialization } from "../middlewares";
import { createFineSerializer } from "../serializers";

const veiculosRoutes = Router();

veiculosRoutes.get("/:identifier", verifyAuth, retrieveVehicleController);
veiculosRoutes.get("/cidadao/:cpf", verifyAuth, listCitizenVehiclesController);
veiculosRoutes.get("/multas/:identifier", verifyAuth, listVehicleFinesController);
veiculosRoutes.post("/multas/:identifier", verifySerialization(createFineSerializer), verifyAuth, createVehicleFineController);

export default veiculosRoutes;
