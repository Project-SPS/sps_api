import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialUpdate } from "../../interfaces/policial.interfaces";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcrypt";

const updatePolicialService = async (id: string, { patente, administrador, senha }: IPolicialUpdate): Promise<Policial> => {

    const policeRepository = AppDataSource.getRepository(Policial);

    const police = await policeRepository.findOneBy({ id: id });

    if(!police) {
        throw new AppError("user not found!", 404);
    }

    await policeRepository.update(id, {
        patente: patente ? patente : police.patente,
        administrador: administrador ? administrador : police.administrador,
        senha: senha ? bcrypt.hashSync(senha, 10) : police.senha,
    });

    const updatePolice = await policeRepository.findOneBy({ id });

    return updatePolice!;
}

export default updatePolicialService;