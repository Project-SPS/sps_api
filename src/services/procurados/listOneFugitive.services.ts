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

  const getFugitive = await fugitiveRepository.find({
    relations: {
      cidadao: true,
    },
  });

  if (!getCitiezen) {
    throw new AppError("Cidadão não existe", 404);
  }

  if (!getFugitive) {
    throw new AppError("Procurado não encontrado", 404);
  }

  return getFugitive;
};

export default listOneFugitiveService;
