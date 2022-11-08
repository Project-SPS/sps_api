import { Boletim } from "../../entity/Boletim.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Policial } from "../../entity/Policial.entity";
import { Veiculo } from "../../entity/Veiculo.entity";
import { Cidadao } from "../../entity/Cidadao.entity";
import { IBoletimRequest } from "../../interfaces/boletim.interfaces";
import { createBulletinSerializer } from "../../serializer/boletim.serializer";

const createBulletinService = async (data: IBoletimRequest): Promise<any> => {
  const serializerBulletim = await createBulletinSerializer.validate(data, {
    stripUnknown: true,
    abortEarly: false,
  });
  const cidadaoRepository = AppDataSource.getRepository(Cidadao);
  const veiculoRepository = AppDataSource.getRepository(Veiculo);
  const policialRepository = AppDataSource.getRepository(Policial);
  const boletimRepository = AppDataSource.getRepository(Boletim);

  const findCidadao = await cidadaoRepository.findOneBy({
    id: data.cidadao_id,
  });
  if (!findCidadao) {
    throw new AppError("Cidadão não existe", 401);
  }
  const findPolicial = await policialRepository.findOneBy({
    id: data.policial_id,
  });
  if (!findPolicial) {
    throw new AppError("Policial não existe", 404);
  }
  if (data.veiculo_id) {
    const findVeiculo = await veiculoRepository.findOneBy({
      id: data.veiculo_id,
    });
    if (!findVeiculo) {
      throw new AppError("Veículo não existe", 404);
    }
    const createBulletin = boletimRepository.create({
      descricao: data.descricao,
      cidadao: findCidadao,
      policial: findPolicial,
      veiculo: findVeiculo,
    });
    await boletimRepository.save(createBulletin);
    const { policial, ...createBulletinRest } = createBulletin;
    return createBulletinRest;
  }
  const createBulletin = boletimRepository.create({
    descricao: data.descricao,
    policial: findPolicial,
    cidadao: findCidadao,
  });
  await boletimRepository.save(createBulletin);
  const { policial, ...createBulletinRest } = createBulletin;
  return createBulletinRest;
};

export default createBulletinService;
