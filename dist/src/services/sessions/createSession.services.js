"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Policial_entity_1 = require("../../entity/Policial.entity");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../../errors/AppError");
require("dotenv/config");
const createSessionService = ({ cod_registro, senha }) => __awaiter(void 0, void 0, void 0, function* () {
    const policialRepository = data_source_1.AppDataSource.getRepository(Policial_entity_1.Policial);
    const policial = yield policialRepository.findOneBy({
        cod_registro: cod_registro,
    });
    if (!policial) {
        throw new AppError_1.AppError("Invalid user or password", 401);
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(senha, policial.senha);
    if (!passwordMatch) {
        throw new AppError_1.AppError("Invalid user or password", 401);
    }
    const token = jsonwebtoken_1.default.sign({
        administrador: policial.administrador,
    }, process.env.SECRET_KEY, {
        expiresIn: "24h",
        subject: policial.id,
    });
    return token;
});
exports.default = createSessionService;
//# sourceMappingURL=createSession.services.js.map