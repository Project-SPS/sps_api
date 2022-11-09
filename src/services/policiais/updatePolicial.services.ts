import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialUpdate } from "../../interfaces/policial.interfaces";
import { AppError } from "../../errors/AppError";

const updatePolicialService = async (cod_registro: string, data: IPolicialUpdate): Promise<Policial> => {
  const policeRepository = AppDataSource.getRepository(Policial);

  const police = await policeRepository.findOneBy({ cod_registro });

  if (!police) {
    throw new AppError("Usuário não encontrado", 404);
  }

  await policeRepository.update(police.id, { ...data });

  const updatePolice = await policeRepository.findOne({
    where: { cod_registro },
    relations: { cidadao: true },
    select: {
      administrador: true,
      ativo: true,
      boletim: true,
      cod_registro: true,
      data_atualizacao: true,
      data_criacao: true,
      id: true,
      patente: true,
    },
  });

  return updatePolice!;
};

export default updatePolicialService;
