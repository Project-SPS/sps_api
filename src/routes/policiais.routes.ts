import { Router } from "express";
import createPolicialController from "../controllers/policiais/createPolicial.controllers";
import deletePolicialController from "../controllers/policiais/deletePolicial.controllers";
import listOnePoliciaisController from "../controllers/policiais/listOnePolice.controllers";
import listPoliciaisController from "../controllers/policiais/listPoliciais.controllers";
import updatePolicialController from "../controllers/policiais/updatePolicial.controllers";
import { verifyAuth } from "../middlewares";
import verifyIsAdmTokenMiddleware from "../middlewares/verifyIsAdmToken.middleware";

const policeRoutes = Router();

policeRoutes.post(
  "",
  verifyAuth,
  verifyIsAdmTokenMiddleware,
  createPolicialController
);
policeRoutes.get(
  "",
  verifyAuth,
  verifyIsAdmTokenMiddleware,
  listPoliciaisController
);

policeRoutes.delete(
  "/:id",
  verifyAuth,
  verifyIsAdmTokenMiddleware,
  deletePolicialController
);
policeRoutes.patch(
  "/:id",
  verifyAuth,
  verifyIsAdmTokenMiddleware,
  updatePolicialController
);

policeRoutes.get(
  "/:cod_registro",
  verifyAuth,
  verifyIsAdmTokenMiddleware,
  listOnePoliciaisController
);

export default policeRoutes;
