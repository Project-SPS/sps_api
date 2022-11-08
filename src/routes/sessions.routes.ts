import { Router } from "express";
import createSessionController from "../controllers/sessions/createSession.controllers";
import { verifySerialization } from "../middlewares";
import { createSessionSerializer } from "../serializers";

const sessionRoutes = Router();

sessionRoutes.post("", verifySerialization(createSessionSerializer), createSessionController);

export default sessionRoutes;
