import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { AppError } from "../../errors/AppError";

const deletePolicialService = async (id: string): Promise<void> => {

    const policeRepository = AppDataSource.getRepository(Policial);

    const police = await policeRepository.findOneBy({ id });

    if(!police) {
        throw new AppError("Invalid id", 404);
    }

    if (police.ativo === false) {
        throw new AppError("Unable to delete inactive user", 400);
      }

      await policeRepository.update(id, {
        ativo: false
      });
}

export default deletePolicialService;