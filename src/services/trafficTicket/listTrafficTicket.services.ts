import { AppDataSource } from "../../data-source";
import { Multa } from "../../entity/Multa.entity";

const listTrafficTicketService = async () => {
  const trafficTicketsRepository = AppDataSource.getRepository(Multa);

  const trafficTickets = await trafficTicketsRepository.find();

  return trafficTickets;
};

export default listTrafficTicketService;
