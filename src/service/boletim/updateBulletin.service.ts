import { Boletim } from "../../entity/Boletim.entity";
import { AppError } from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { updateBulletinSerializer } from "../../serializer/boletim.serializer";
import { IBoletimUpdateRequest } from "../../interfaces/boletim.interfaces";

const updateBulletinService = async (data: IBoletimUpdateRequest, id: string): Promise<Boletim> => {
  const updateSerializer = await updateBulletinSerializer.validate(data);
  const boletimRepository = AppDataSource.getRepository(Boletim);
  const findBoletim = await boletimRepository.findOneBy({ id });
  if (!findBoletim) {
    throw new AppError("Boletim de ocorrencia não encontrado", 401);
  }
  await boletimRepository.update(id, { finalizado: data.finalizado });
  const boletim = await boletimRepository.findOneBy({ id });
  return boletim as Boletim;
};

export default updateBulletinService;
