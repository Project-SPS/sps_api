"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listOneTrafficTicket_controller_1 = __importDefault(require("../controllers/trafficTicket/listOneTrafficTicket.controller"));
const listTrafficTicket_controller_1 = __importDefault(require("../controllers/trafficTicket/listTrafficTicket.controller"));
const multasRoutes = (0, express_1.Router)();
multasRoutes.get("", listTrafficTicket_controller_1.default);
multasRoutes.get("/:id", listOneTrafficTicket_controller_1.default);
exports.default = multasRoutes;
//# sourceMappingURL=multas.routes.js.map