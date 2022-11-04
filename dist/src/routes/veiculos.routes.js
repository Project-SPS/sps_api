"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const veiculos_1 = require("../controllers/veiculos");
const veiculosRoutes = (0, express_1.Router)();
veiculosRoutes.get("/:identifier", veiculos_1.retrieveVehicleController);
veiculosRoutes.get("/cidadao/:cpf", veiculos_1.listCitizenVehiclesController);
veiculosRoutes.get("/multas/:identifier", veiculos_1.listVehicleFinesController);
veiculosRoutes.post("/multas/:identifier", veiculos_1.createVehicleFineController);
exports.default = veiculosRoutes;
//# sourceMappingURL=veiculos.routes.js.map