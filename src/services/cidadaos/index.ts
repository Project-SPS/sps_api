import { AppDataSource } from "../../data-source";
import { Cidadao } from "../../entity/Cidadao.entity";
import { AppError } from "../../errors/AppError";

const citizenRepository = AppDataSource.getRepository(Cidadao)

export const listCitizensService = async () => {
 const citizens = await citizenRepository.find()

 return citizens
}

export const searchCitizenByCpfService = async ( cpf:string ) => {
 const findCitizen = await citizenRepository.findOneBy({ cpf })
 
 if (!findCitizen) {
  throw new AppError('Cidadão não encontrado', 404)
 }
 
 return findCitizen
}
