import { AppDataSource } from "../../data-source";
import { IProcuradosUpdate } from "../../interfaces/procurados.interfaces";
import { Procurado } from "../../entity/Procurado.entity";
import { AppError } from "../../errors/AppError";
const updateFugitiveService = async (body: IProcuradosUpdate, cpf: string) => {
  const fugitivesRepository = AppDataSource.getRepository(Procurado);

  const fugitiveExists = fugitivesRepository.find({
    relations: {
      cidadao: true,
    },
  });

  if (!fugitiveExists) {
    throw new AppError("Procurado não existe", 404);
  }

  await fugitivesRepository.update(cpf, body);
  return;
};
export default updateFugitiveService;
