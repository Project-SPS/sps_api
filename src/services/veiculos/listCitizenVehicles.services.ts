import { AppDataSource } from "../../data-source";
import { Cidadao } from "../../entity/Cidadao.entity";
import { Veiculo } from "../../entity/Veiculo.entity";
import { AppError } from "../../errors/AppError";

const listCitizenVehiclesService = async (cpf: string): Promise<Veiculo[]> => {
  const vehicleRepository = AppDataSource.getRepository(Veiculo);
  const citizenRepository = AppDataSource.getRepository(Cidadao);

  const citizen = await citizenRepository.findOneBy({ cpf });

  if (!citizen) {
    throw new AppError("Cidadão não encontrado", 404);
  }

  const vehicles = await vehicleRepository.find({
    where: {
      cidadao: {
        id: citizen.id,
      },
    },
  });

  return vehicles;
};

export default listCitizenVehiclesService;
