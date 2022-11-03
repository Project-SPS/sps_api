import { AppDataSource } from "../../data-source";
import { VeiculoMulta } from "../../entity/VeiculoMulta.entity";
import { Multa } from "../../entity/Multa.entity";
import retrieveVehicleService from "./retrieveVehicle.service";
import { IVehicleRequest } from "../../interfaces/veiculo.interfaces";

const listVehicleFinesService = async (
  data: IVehicleRequest
): Promise<VeiculoMulta[]> => {
  const veiculoMultaRepository = AppDataSource.getRepository(VeiculoMulta);
  const multaRepository = AppDataSource.getRepository(Multa);

  const veiculo = await retrieveVehicleService(data);

  const fines = await veiculoMultaRepository.find({
    where: {
      veiculo: {
        id: veiculo.id,
      },
    },
    relations: {
      multa: true,
    },
  });

  return fines;
};

export default listVehicleFinesService;
