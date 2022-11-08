import { Cidadao } from "../../entity/Cidadao.entity";
import { Boletim } from "../../entity/Boletim.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const listBulletinCitizenService = async (cpf: string): Promise<Boletim[]> => {
  const cidadaoRepository = AppDataSource.getRepository(Cidadao);
  const boletimRepository = AppDataSource.getRepository(Boletim);
  const findCidadao = await cidadaoRepository.findOneBy({ cpf });
  if (!findCidadao) {
    throw new AppError("Cidadão não existe", 404);
  }
  const findBoletim = await boletimRepository.find({
    relations: { cidadao: true },
    where: { cidadao: { id: findCidadao.id } },
  });
  if (findBoletim.length === 0) {
    throw new AppError("Cidadão limpo", 200);
  }
  return findBoletim;
};

export default listBulletinCitizenService;
