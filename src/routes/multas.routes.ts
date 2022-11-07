import { Router } from "express";
import listOneTrafficTicketController from "../controllers/trafficTicket/listOneTrafficTicket.controller";
import listTrafficTicketController from "../controllers/trafficTicket/listTrafficTicket.controller";
import { verifyAuth } from "../middlewares";

const multasRoutes = Router();

multasRoutes.get("", verifyAuth, listTrafficTicketController);
multasRoutes.get("/:id", verifyAuth, listOneTrafficTicketController);

export default multasRoutes;
