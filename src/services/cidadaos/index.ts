import { AppDataSource } from "../../data-source";
import { Cidadao } from "../../entity/Cidadao.entity";
import { AppError } from "../../errors/AppError";

const citizenRepository = AppDataSource.getRepository(Cidadao);

export const listCitizensService = async () => {
  const citizens = await citizenRepository.find({
    select: {
      policial: {
        ativo: true,
        patente: true,
        cod_registro: true,
      },
    },
    relations: {
      boletim: true,
      veiculo: true,
      endereco: true,
      procurado: true,
      policial: true,
    },
  });

  return citizens;
};

export const searchCitizenByCpfService = async (cpf: string) => {
  const findCitizen = await citizenRepository.findOne({
    where: {
      cpf,
    },
    select: {
      policial: {
        ativo: true,
        patente: true,
        cod_registro: true,
      },
    },
    relations: {
      boletim: true,
      veiculo: true,
      endereco: true,
      procurado: true,
      policial: true,
    },
  });

  if (findCitizen === null) {
    throw new AppError("Cidadão não encontrado", 404);
  }

  return findCitizen;
};
