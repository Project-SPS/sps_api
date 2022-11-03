import { AppDataSource } from "../../data-source";
import { Veiculo } from "../../entity/Veiculo.entity";
import { AppError } from "../../errors/AppError";
import { IVehicleRequest } from "../../interfaces/veiculo.interfaces";

const retrieveVehicleService = async (
  data: IVehicleRequest
): Promise<Veiculo> => {
  const veiculoRepository = AppDataSource.getRepository(Veiculo);

  const { placa, chassi } = data;

  let veiculo: Veiculo;
  if (placa) {
    veiculo = await veiculoRepository.findOneBy({ placa });
  } else if (chassi) {
    veiculo = await veiculoRepository.findOneBy({ chassi });
  } else {
    throw new AppError("Bad request", 400);
  }

  if (!veiculo) {
    throw new AppError("Vehicle not found!", 404);
  }

  return veiculo;
};

export default retrieveVehicleService;
