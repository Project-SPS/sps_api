import { Request, Response } from 'express'
import { listCitizensService, searchCitizenByCpfService } from '../../services/cidadaos'

export const listCitizensController = async (request: Request, response: Response) => {
 const cidadaos = await listCitizensService()

 return response.status(200).json(cidadaos)
}

export const searchCitizenByCpfController = async (request: Request, response: Response) => {
 const { cpf } = request.params

 const cidadao = await searchCitizenByCpfService(cpf)

 return response.status(200).json(cidadao)
}
 