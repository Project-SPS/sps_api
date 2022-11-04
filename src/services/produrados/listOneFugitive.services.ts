import { AppDataSource } from "../../data-source";
import { Procurado } from "../../entity/Procurado.entity";
import { Cidadao } from "../../entity/Cidadao.entity";
import { AppError } from "../../errors/AppError";

const listOneFugitiveService = async (cpf: string) => {
  const fugitiveRepository = AppDataSource.getRepository(Procurado);

  const citiziensRepository = AppDataSource.getRepository(Cidadao);

  const getCitiezen = await citiziensRepository.findOneBy({
    cpf: cpf,
  });

  const getFugitive = await fugitiveRepository.findOneBy({
    id: cpf,
  });

  if (!getCitiezen) {
    throw new AppError("");
  }

  return getFugitive
};

export default listOneFugitiveService;
