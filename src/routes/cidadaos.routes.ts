import { Router } from "express"
import { listCitizensController, searchCitizenByCpfController } from "../controllers/cidadaos"

const cidadaosRoutes = Router()

cidadaosRoutes.get("", listCitizensController)
cidadaosRoutes.get("/:cpf", searchCitizenByCpfController)

export default cidadaosRoutes