import { AppDataSource } from "../../data-source";
import { Multa } from "../../entity/Multa.entity";
import { VeiculoMulta } from "../../entity/VeiculoMulta.entity";
import { AppError } from "../../errors/AppError";
import { IVehicleRequest } from "../../interfaces/veiculo.interfaces";
import retrieveVehicleService from "./retrieveVehicle.service";

const createVehicleFineService = async (
  identifier: string,
  multaId: string
) => {
  const multaRepository = await AppDataSource.getRepository(Multa);
  const veiculoMultaRepository = await AppDataSource.getRepository(
    VeiculoMulta
  );

  const vehicle = await retrieveVehicleService(identifier);

  const fine = await multaRepository.findOneBy({
    id: multaId,
  });

  if (!fine) {
    throw new AppError("Fine not found", 404);
  }

  await veiculoMultaRepository.save({
    veiculo: vehicle,
    multa: fine,
  });
};

export default createVehicleFineService;
