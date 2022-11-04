"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSession_controllers_1 = __importDefault(require("../controllers/sessions/createSession.controllers"));
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post('', createSession_controllers_1.default);
exports.default = sessionRoutes;
//# sourceMappingURL=sessions.routes.js.map