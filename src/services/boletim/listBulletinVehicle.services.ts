import { Boletim } from "../../entity/Boletim.entity";
import { Veiculo } from "../../entity/Veiculo.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const listBulletinVehicleService = async (
  placa: string
): Promise<Boletim[]> => {
  const boletimRepository = AppDataSource.getRepository(Boletim);
  const vehicleRepository = AppDataSource.getRepository(Veiculo);
  const findVehicle = await vehicleRepository.findOneBy({ placa });
  if (!findVehicle) {
    throw new AppError("veículo não existe", 404);
  }
  const findBoletim = await boletimRepository.find({
    relations: { veiculo: true },
    where: { veiculo: { id: findVehicle.id } },
  });
  if (findBoletim.length === 0) {
    throw new AppError("Veículo sem boletins", 201);
  }
  return findBoletim;
};

export default listBulletinVehicleService;
