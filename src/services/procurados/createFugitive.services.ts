import { AppDataSource } from "../../data-source";
import { IProcurados } from "../../interfaces/procurados.interfaces";
import { Procurado } from "../../entity/Procurado.entity";
import { Cidadao } from "../../entity/Cidadao.entity";
import { AppError } from "../../errors/AppError";
const createFugitiveServices = async (fugitive: IProcurados) => {
  const fugitivesRepository = AppDataSource.getRepository(Procurado);
  const citiziensRepository = AppDataSource.getRepository(Cidadao);

  const getCitiezen = await citiziensRepository.findOneBy({
    id: fugitive.cidadao_id,
  });

  if (!getCitiezen) {
    throw new AppError("Cidadão não encontrado", 404);
  }

  const newFugitive = new Procurado();

  newFugitive.descricao = fugitive.descricao;
  newFugitive.esta_ativo = fugitive.esta_ativo;

  fugitivesRepository.create(newFugitive);

  await fugitivesRepository.save(newFugitive);

  return fugitive;
};

export default createFugitiveServices;
