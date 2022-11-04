import { AppDataSource } from "../../data-source";
import { Boletim } from "../../entity/Boletim.entity";
import { AppError } from "../../errors/AppError";
import { IBoletimUpdateRequest } from "../../interfaces/boletim.interfaces";
import { updateBulletinSerializer } from "../../serializer/boletim.serializer";

const updateBulletinService = async (data:IBoletimUpdateRequest, id: string):Promise<Boletim> => {
    const updateSerializer = await updateBulletinSerializer.validate(data);
    const boletimRepository = AppDataSource.getRepository(Boletim);
    const findBoletim = await boletimRepository.findOneBy({id});
    if(!findBoletim) {
        throw new AppError("Boletim de ocorrencia não encontrado", 401)
    }
    await boletimRepository.update(id,{finalizado: data.finalizado});
    const boletim = await boletimRepository.findOneBy({id})
    return boletim!
}

export default updateBulletinService