import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { AppError } from "../../errors/AppError";

const deletePolicialService = async (cod_registro: string): Promise<void> => {
  const policeRepository = AppDataSource.getRepository(Policial);

  const police = await policeRepository.findOneBy({ cod_registro });

  if (!police) {
    throw new AppError("ID inválido", 404);
  }

  if (police.ativo === false) {
    throw new AppError("O usuário já está inativo", 400);
  }

  await policeRepository.update(police.id, { ativo: false });
};

export default deletePolicialService;
