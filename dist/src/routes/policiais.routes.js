"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createPolicial_controllers_1 = __importDefault(require("../controllers/policiais/createPolicial.controllers"));
const deletePolicial_controllers_1 = __importDefault(require("../controllers/policiais/deletePolicial.controllers"));
const listOnePolice_controllers_1 = __importDefault(require("../controllers/policiais/listOnePolice.controllers"));
const listPoliciais_controllers_1 = __importDefault(require("../controllers/policiais/listPoliciais.controllers"));
const updatePolicial_controllers_1 = __importDefault(require("../controllers/policiais/updatePolicial.controllers"));
const policeRoutes = (0, express_1.Router)();
policeRoutes.post("", createPolicial_controllers_1.default);
policeRoutes.get("", listPoliciais_controllers_1.default);
policeRoutes.delete("/:id", deletePolicial_controllers_1.default);
policeRoutes.patch("/:id", updatePolicial_controllers_1.default);
policeRoutes.get("/:cod_registro", listOnePolice_controllers_1.default);
exports.default = policeRoutes;
//# sourceMappingURL=policiais.routes.js.map