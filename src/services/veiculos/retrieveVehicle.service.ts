import { AppDataSource } from "../../data-source";
import { Veiculo } from "../../entity/Veiculo.entity";
import { AppError } from "../../errors/AppError";
import { IVehicleRequest } from "../../interfaces/veiculo.interfaces";

const retrieveVehicleService = async (identifier: string): Promise<Veiculo> => {
  const veiculoRepository = AppDataSource.getRepository(Veiculo);

  let veiculo: Veiculo | null;
  if (identifier.length === 8) {
    veiculo = await veiculoRepository.findOneBy({ placa: identifier });
  } else if (identifier.length === 17) {
    veiculo = await veiculoRepository.findOneBy({ chassi: identifier });
  } else {
    throw new AppError("Bad request", 400);
  }

  if (!veiculo) {
    throw new AppError("Vehicle not found!", 404);
  }

  return veiculo;
};

export default retrieveVehicleService;
