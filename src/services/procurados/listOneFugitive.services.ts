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

  if (!getCitiezen) {
    throw new AppError("Cidadão não existe", 404);
  }

  const getFugitive = await fugitiveRepository.findOne({
    where: {
      cidadao: {
        cpf,
      },
    },
    relations: {
      cidadao: true,
    },
  });

  if (!getFugitive) {
    throw new AppError("Procurado não encontrado", 404);
  }

  return getFugitive;
};

export default listOneFugitiveService;
