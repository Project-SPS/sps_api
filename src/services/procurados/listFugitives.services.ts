import { AppDataSource } from "../../data-source";
import { Procurado } from "../../entity/Procurado.entity";

const listFugitivesServices = async () => {
  const fugitivesRepository = AppDataSource.getRepository(Procurado);

  const fugitives = fugitivesRepository.find({ relations: { cidadao: true } });

  return fugitives;
};

export default listFugitivesServices;
