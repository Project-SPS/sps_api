import { Router } from "express";
import {
  createBulletinController,
  listBulletinCitizenController,
  listBulletinController,
  listBulletinVehicleController,
  updateBulletinController,
} from "../controllers/boletins";
import { verifyAuth, verifySerialization } from "../middlewares";
import { createBulletinSerializer, updateBulletinSerializer } from "../serializers";

const boletimRouter = Router();
boletimRouter.post("", verifySerialization(createBulletinSerializer), verifyAuth, createBulletinController); //criação de boletim
boletimRouter.patch("/:id", verifySerialization(updateBulletinSerializer), verifyAuth, updateBulletinController); // update do status do boletim
boletimRouter.get("/cidadao/:cpf", verifyAuth, listBulletinCitizenController); // lista os boletins por cpf
boletimRouter.get("/veiculo/:placa", verifyAuth, listBulletinVehicleController); // lista os boletins por placa de um veiculo
boletimRouter.get("/:id", verifyAuth, listBulletinController); // lista o respectivo boletim por id

export default boletimRouter;
