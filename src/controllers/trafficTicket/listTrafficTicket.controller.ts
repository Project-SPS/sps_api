import { Request, Response } from "express";
import listTrafficTicketService from "../../services/trafficTicket/listTrafficTicket.services";

const listTrafficTicketController = async (req: Request, res: Response) => {
  const trafficTickets = await listTrafficTicketService();

  return res.status(200).json(trafficTickets);
};

export default listTrafficTicketController;
