import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialRequest } from "../../interfaces/policial.interfaces";
import { AppError } from "../../errors/AppError";
import bcryptjs from "bcryptjs";

const createPolicialService = async ({cod_registro, patente, senha, administrador}: IPolicialRequest): Promise<Policial> => {

    const policeRepository = AppDataSource.getRepository(Policial);

    const cod_registerExist = await policeRepository.findOneBy({cod_registro});

    if (cod_registerExist) {
        throw new AppError("This cod is already being used", 400);
    }

    senha = bcryptjs.hashSync(senha, 10);

    const newPolice = policeRepository.create({
        cod_registro,
        patente,
        administrador,
        senha
});

await policeRepository.save(newPolice);

return newPolice;

}

export default createPolicialService;