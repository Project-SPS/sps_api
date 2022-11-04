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
const AppError_1 = require("../../errors/AppError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createPolicialService = ({ cod_registro, patente, senha, administrador }) => __awaiter(void 0, void 0, void 0, function* () {
    const policeRepository = data_source_1.AppDataSource.getRepository(Policial_entity_1.Policial);
    const cod_registerExist = yield policeRepository.findOneBy({ cod_registro });
    if (cod_registerExist) {
        throw new AppError_1.AppError("This cod is already being used", 400);
    }
    senha = bcryptjs_1.default.hashSync(senha, 10);
    const newPolice = policeRepository.create({
        cod_registro,
        patente,
        administrador,
        senha
    });
    yield policeRepository.save(newPolice);
    return newPolice;
});
exports.default = createPolicialService;
//# sourceMappingURL=createPolicial.services.js.map