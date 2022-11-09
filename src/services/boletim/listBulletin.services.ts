import { Boletim } from "../../entity/Boletim.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const listBulletinService = async (id: string): Promise<Boletim> => {
  const bulletinRepository = AppDataSource.getRepository(Boletim);
  const findBulletin = await bulletinRepository.findOne({
    where: {
      id,
    },
    relations: {
      cidadao: true,
      veiculo: true,
    },
  });
  if (!findBulletin) {
    throw new AppError("Boletim não encontrado", 404);
  }
  return findBulletin;
};

export default listBulletinService;
