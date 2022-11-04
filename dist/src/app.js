"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const boletim_routes_1 = __importDefault(require("./routes/boletim.routes"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/boletim", boletim_routes_1.default);
(0, routes_1.appRoutes)(app);
app.use(middlewares_1.handleErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map