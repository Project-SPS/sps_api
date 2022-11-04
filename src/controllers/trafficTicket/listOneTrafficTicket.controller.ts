import { Request, Response } from "express";
import listOneTrafficTicketService from "../../services/trafficTicket/listOneTrafficTicket.service";
const listOneTrafficTicketController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const trafficTicket = await listOneTrafficTicketService(id);

  return res.status(200).json(trafficTicket);
};

export default listOneTrafficTicketController;
