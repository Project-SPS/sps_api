import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialResponse } from "../../interfaces/policial.interfaces";
import { AppError } from "../../errors/AppError";

const listOnePoliciaisService = async (
  cod_registro: string
): Promise<IPolicialResponse> => {
  const policeRepository = AppDataSource.getRepository(Policial);

  const policeFound = await policeRepository.findOne({
    where: {
      cod_registro,
    },
    relations: {
      cidadao: true,
    },
  });

  if (!policeFound) {
    throw new AppError("Invalid id", 404);
  }

  const { senha, ...policeFoundRest } = policeFound;
  return policeFoundRest;
};

export default listOnePoliciaisService;
