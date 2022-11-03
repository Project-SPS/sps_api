import { Router } from "express";
import createPolicialController from "../controllers/policiais/createPolicial.controllers";
import deletePolicialController from "../controllers/policiais/deletePolicial.controllers";
import listOnePoliciaisController from "../controllers/policiais/listOnePolice.controllers";
import listPoliciaisController from "../controllers/policiais/listPoliciais.controllers";
import updatePolicialController from "../controllers/policiais/updatePolicial.controllers";

const policeRoutes = Router();

policeRoutes.post("", createPolicialController);
policeRoutes.get("", listPoliciaisController);

policeRoutes.delete("/:id", deletePolicialController);
policeRoutes.patch("/:id", updatePolicialController);

policeRoutes.get("/:cod_registro", listOnePoliciaisController);


export default policeRoutes;