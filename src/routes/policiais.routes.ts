import { Router } from "express";
import createPolicialController from "../controllers/policiais/createPolicial.controllers";
import deletePolicialController from "../controllers/policiais/deletePolicial.controllers";
import listOnePoliciaisController from "../controllers/policiais/listOnePolice.controllers";
import listPoliciaisController from "../controllers/policiais/listPoliciais.controllers";
import updatePolicialController from "../controllers/policiais/updatePolicial.controllers";
import { verifyAuth, verifyCanUpdateMiddleware, verifyIsAdmTokenMiddleware, verifySerialization } from "../middlewares";
import { createPolicialSerializer, updatePolicialSerializer } from "../serializers";

const policeRoutes = Router();

policeRoutes.post("", verifySerialization(createPolicialSerializer), verifyAuth, verifyIsAdmTokenMiddleware, createPolicialController);
policeRoutes.get("", verifyAuth, verifyIsAdmTokenMiddleware, listPoliciaisController);

policeRoutes.delete("/:cod_registro", verifyAuth, verifyIsAdmTokenMiddleware, deletePolicialController);
policeRoutes.patch(
  "/:cod_registro",
  verifySerialization(updatePolicialSerializer),
  verifyAuth,
  verifyCanUpdateMiddleware,
  updatePolicialController
);

policeRoutes.get("/:cod_registro", verifyAuth, verifyIsAdmTokenMiddleware, listOnePoliciaisController);

export default policeRoutes;
