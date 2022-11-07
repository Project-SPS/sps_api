import { AppDataSource } from "../../data-source";
import { Multa } from "../../entity/Multa.entity";
import { AppError } from "../../errors/AppError";

const listOneTrafficTicketService = async (id: string) => {
  const trafficTicketRepository = AppDataSource.getRepository(Multa);

  const trafficTicket = await trafficTicketRepository.findOneBy({
    id,
  });

  if (!trafficTicket) {
    throw new AppError("Multa não econtrada", 404);
  }

  return trafficTicket;
};

export default listOneTrafficTicketService;
