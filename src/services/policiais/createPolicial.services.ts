import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialRequest } from "../../interfaces/policial.interfaces";
import { AppError } from "../../errors/AppError";
import bcryptjs from "bcryptjs";
import { Cidadao } from "../../entity/Cidadao.entity";

const createPolicialService = async ({
  cod_registro,
  patente,
  senha,
  administrador,
  cidadaoId,
}: IPolicialRequest): Promise<Policial> => {
  const policeRepository = AppDataSource.getRepository(Policial);
  const citizenRepository = AppDataSource.getRepository(Cidadao);

  const citizen = await citizenRepository.findOneBy({ id: cidadaoId });

  if (!citizen) {
    throw new AppError("Cidadão não encontrado", 404);
  }

  const cod_registerExist = await policeRepository.findOneBy({ cod_registro });

  if (cod_registerExist) {
    throw new AppError("This cod is already being used", 400);
  }

  senha = bcryptjs.hashSync(senha, 10);

  const newPolice = policeRepository.create({
    cod_registro,
    patente,
    administrador,
    senha,
    cidadao: citizen,
  });

  await policeRepository.save(newPolice);

  return newPolice;
};

export default createPolicialService;
