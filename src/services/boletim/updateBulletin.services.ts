import { Boletim } from "../../entity/Boletim.entity";
import { AppError } from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { IBoletimUpdateRequest } from "../../interfaces/boletim.interfaces";

const updateBulletinService = async (data: IBoletimUpdateRequest, id: string): Promise<Boletim> => {
  const boletimRepository = AppDataSource.getRepository(Boletim);
  const findBoletim = await boletimRepository.findOneBy({ id });
  if (!findBoletim) {
    throw new AppError("Boletim de ocorrencia não encontrado", 404);
  }
  await boletimRepository.update(id, { finalizado: data.finalizado });
  const boletim = await boletimRepository.findOneBy({ id });
  return boletim!;
};

export default updateBulletinService;
