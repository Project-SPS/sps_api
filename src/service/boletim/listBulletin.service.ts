import { Boletim } from "../../entity/Boletim.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";


const listBulletinService = async (id:string):Promise<Boletim> => {
    const bulletinRepository = AppDataSource.getRepository(Boletim);
    const findBulletin = await bulletinRepository.findOneBy({id});
    if(!findBulletin) {
        throw new AppError("Boletim não encontrado", 401)
    }
    return findBulletin
}

export default listBulletinService