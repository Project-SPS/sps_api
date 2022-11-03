import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { IPolicialResponse } from "../../interfaces/policial.interfaces";

const listPoliciaisService = async (): Promise<IPolicialResponse[]> => {

    const policeRepository = AppDataSource.getRepository(Policial);

    const polices = (await policeRepository.find()).map(police => {
        const { senha, ...policeRest } = police;

        return policeRest;
    });

    return polices;
}

export default listPoliciaisService;