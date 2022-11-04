import { Router } from "express";
import listOneTrafficTicketController from "../controllers/trafficTicket/listOneTrafficTicket.controller";
import listTrafficTicketController from "../controllers/trafficTicket/listTrafficTicket.controller";

const multasRoutes = Router();

multasRoutes.get("", listTrafficTicketController);
multasRoutes.get("/:id", listOneTrafficTicketController);

export default multasRoutes;
