"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createFugitive_controller_1 = __importDefault(require("../controllers/procurados/createFugitive.controller"));
const listFugitives_controllers_1 = __importDefault(require("../controllers/procurados/listFugitives.controllers"));
const listOneFugitive_controllers_1 = __importDefault(require("../controllers/procurados/listOneFugitive.controllers"));
const updateFugitive_controllers_1 = __importDefault(require("../controllers/procurados/updateFugitive.controllers"));
const procuradosRoutes = (0, express_1.Router)();
procuradosRoutes.get("", listFugitives_controllers_1.default);
procuradosRoutes.get("/:id", listOneFugitive_controllers_1.default);
procuradosRoutes.post("", createFugitive_controller_1.default);
procuradosRoutes.patch("/:id", updateFugitive_controllers_1.default);
exports.default = procuradosRoutes;
//# sourceMappingURL=procurados.routes.js.map