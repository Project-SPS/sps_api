import { Router } from "express"
import { listCitizensController, searchCitizenByCpfController } from "../controllers/cidadaos"

const routes = Router()

//Cidadaos
routes.get("/cidadaos", listCitizensController)
routes.get("/cidadaos/:cpf", searchCitizenByCpfController)

export default routes