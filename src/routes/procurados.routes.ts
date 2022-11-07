import { Router } from "express";
import createFugitiveController from "../controllers/procurados/createFugitive.controller";
import listFugitivesController from "../controllers/procurados/listFugitives.controllers";
import listOneFugitiveController from "../controllers/procurados/listOneFugitive.controllers";
import updateFugitiveController from "../controllers/procurados/updateFugitive.controllers";
import { verifyAuth } from "../middlewares";

const procuradosRoutes = Router();

procuradosRoutes.get("", verifyAuth, listFugitivesController);
procuradosRoutes.get("/:id", verifyAuth, listOneFugitiveController);
procuradosRoutes.post("", verifyAuth, createFugitiveController);
procuradosRoutes.patch("/:id", verifyAuth, updateFugitiveController);

export default procuradosRoutes;
