import { AppDataSource } from "../../data-source";
import { IProcurados } from "../../interfaces/procurados.interfaces";
import { Procurado } from "../../entity/Procurado.entity";
import { Cidadao } from "../../entity/Cidadao.entity";
import { AppError } from "../../errors/AppError";
const createFugitiveServices = async (fugitive: IProcurados) => {
  const fugitivesRepository = AppDataSource.getRepository(Procurado);
  const citiziensRepository = AppDataSource.getRepository(Cidadao);

  const getCitiezen = await citiziensRepository.findOneBy({
    id: fugitive.cidadaoId,
  });

  if (!getCitiezen) {
    throw new AppError("Cidadão não encontrado", 404);
  }

  const newFugitive = new Procurado();

  newFugitive.descricao = fugitive.descricao;
  if (fugitive.esta_ativo) {
    newFugitive.esta_ativo = fugitive.esta_ativo;
  }
  newFugitive.cidadao = getCitiezen;

  fugitivesRepository.create(newFugitive);

  await fugitivesRepository.save(newFugitive);

  return newFugitive;
};

export default createFugitiveServices;
