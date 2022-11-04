"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cidadaos_1 = require("../controllers/cidadaos");
const cidadaosRoutes = (0, express_1.Router)();
cidadaosRoutes.get("", cidadaos_1.listCitizensController);
cidadaosRoutes.get("/:cpf", cidadaos_1.searchCitizenByCpfController);
exports.default = cidadaosRoutes;
//# sourceMappingURL=cidadaos.routes.js.map