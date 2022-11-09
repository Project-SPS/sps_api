import { AppDataSource } from "../../data-source";
import { IProcuradosUpdate } from "../../interfaces/procurados.interfaces";
import { Procurado } from "../../entity/Procurado.entity";
import { AppError } from "../../errors/AppError";

const updateFugitiveService = async (body: IProcuradosUpdate, id: string) => {
  const fugitivesRepository = AppDataSource.getRepository(Procurado);

  const fugitiveExists = await fugitivesRepository.find({
    relations: {
      cidadao: true,
    },
    where: {
      id,
    },
  });

  if (fugitiveExists.length <= 0) {
    throw new AppError("Procurado não existe", 404);
  }

  await fugitivesRepository.update(fugitiveExists[0].id, body);

  const updatedFugitive = await fugitivesRepository.findOne({
    relations: {
      cidadao: true,
    },
    where: {
      id,
    },
  });

  return updatedFugitive;
};
export default updateFugitiveService;
