import { Router } from "express";
import { createBulletinController, listBulletinCitizenController, listBulletinController, listBulletinVehicleController, updateBulletinController } from "../controllers/boletins";

const boletimRouter = Router();
boletimRouter.post("", createBulletinController); //criação de boletim 
boletimRouter.patch("/:id", updateBulletinController); // update do status do boletim 
boletimRouter.get("/cidadao/:cpf", listBulletinCitizenController) // lista os boletins por cpf 
boletimRouter.get("/veiculo/:placa", listBulletinVehicleController) // lista os boletins por placa de um veiculo 
boletimRouter.get('/:id',listBulletinController) // lista o respectivo boletim por id 



export default boletimRouter