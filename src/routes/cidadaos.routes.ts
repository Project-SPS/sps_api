import { Router } from "express";
import {
  listCitizensController,
  searchCitizenByCpfController,
} from "../controllers/cidadaos";
import { verifyAuth } from "../middlewares";

const cidadaosRoutes = Router();

cidadaosRoutes.get("", verifyAuth, listCitizensController);
cidadaosRoutes.get("/:cpf", verifyAuth, searchCitizenByCpfController);

export default cidadaosRoutes;
