"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const sessions_routes_1 = __importDefault(require("./sessions.routes"));
const veiculos_routes_1 = __importDefault(require("./veiculos.routes"));
const policiais_routes_1 = __importDefault(require("./policiais.routes"));
const appRoutes = (app) => {
    app.use("/veiculos", veiculos_routes_1.default);
    app.use("/sessions", sessions_routes_1.default);
    app.use("/policiais", policiais_routes_1.default);
};
exports.appRoutes = appRoutes;
//# sourceMappingURL=index.js.map