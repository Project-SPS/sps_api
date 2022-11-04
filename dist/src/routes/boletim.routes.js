"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boletins_1 = require("../controllers/boletins");
const boletimRouter = (0, express_1.Router)();
boletimRouter.post("", boletins_1.createBulletinController); //criação de boletim 
boletimRouter.patch("/:id", boletins_1.updateBulletinController); // update do status do boletim 
boletimRouter.get("/cidadao/:cpf", boletins_1.listBulletinCitizenController); // lista os boletins por cpf 
boletimRouter.get("/veiculo/:placa", boletins_1.listBulletinVehicleController); // lista os boletins por placa de um veiculo 
boletimRouter.get('/:id', boletins_1.listBulletinController); // lista o respectivo boletim por id 
exports.default = boletimRouter;
//# sourceMappingURL=boletim.routes.js.map