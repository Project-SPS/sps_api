import { Router } from "express";
import createFugitiveController from "../controllers/procurados/createFugitive.controller";
import listFugitivesController from "../controllers/procurados/listFugitives.controllers";
import listOneFugitiveController from "../controllers/procurados/listOneFugitive.controllers";
import updateFugitiveController from "../controllers/procurados/updateFugitive.controllers";

const procuradosRoutes = Router();

procuradosRoutes.get("", listFugitivesController);
procuradosRoutes.get("/:id", listOneFugitiveController);
procuradosRoutes.post("", createFugitiveController);
procuradosRoutes.patch("/:id", updateFugitiveController);

export default procuradosRoutes;
