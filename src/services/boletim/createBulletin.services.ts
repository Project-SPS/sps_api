import { Boletim } from "../../entity/Boletim.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Policial } from "../../entity/Policial.entity";
import { Veiculo } from "../../entity/Veiculo.entity";
import { Cidadao } from "../../entity/Cidadao.entity";
import { IBoletimRequest } from "../../interfaces/boletim.interfaces";
import { createBulletinSerializer } from "../../serializers/boletim.serializer";

const createBulletinService = async (data: IBoletimRequest): Promise<Boletim> => {
  const cidadaoRepository = AppDataSource.getRepository(Cidadao);
  const veiculoRepository = AppDataSource.getRepository(Veiculo);
  const policialRepository = AppDataSource.getRepository(Policial);
  const boletimRepository = AppDataSource.getRepository(Boletim);

  const findCidadao = await cidadaoRepository.findOneBy({ id: data.cidadao_id });
  if (!findCidadao) {
    throw new AppError("Cidadão não existe", 401);
  }
  const findPolicial = await policialRepository.findOneBy({ id: data.policial_id });
  if (!findPolicial) {
    throw new AppError("Policial não existe", 401);
  }
  if (data.veiculo_id) {
    const findVeiculo = await veiculoRepository.findOneBy({ id: data.veiculo_id });
    if (!findVeiculo) {
      throw new AppError("Veículo não exite", 401);
    }
    const createBulletin = boletimRepository.create({
      descricao: data.descricao,
      cidadao: findCidadao,
      policial: findPolicial,
      veiculo: findVeiculo,
    });
    await boletimRepository.save(createBulletin);
    return createBulletin;
  }
  const createBulletin = boletimRepository.create({ descricao: data.descricao, policial: findPolicial, cidadao: findCidadao });
  await boletimRepository.save(createBulletin);
  return createBulletin;
};

export default createBulletinService;
