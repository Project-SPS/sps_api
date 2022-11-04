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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCitizenByCpfService = exports.listCitizensService = void 0;
const data_source_1 = require("../../data-source");
const Cidadao_entity_1 = require("../../entity/Cidadao.entity");
const AppError_1 = require("../../errors/AppError");
const citizenRepository = data_source_1.AppDataSource.getRepository(Cidadao_entity_1.Cidadao);
const listCitizensService = () => __awaiter(void 0, void 0, void 0, function* () {
    const citizens = yield citizenRepository.find();
    return citizens;
});
exports.listCitizensService = listCitizensService;
const searchCitizenByCpfService = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    const findCitizen = yield citizenRepository.findOneBy({ cpf });
    if (findCitizen === null) {
        throw new AppError_1.AppError('Cidadão não encontrado', 404);
    }
    return findCitizen;
});
exports.searchCitizenByCpfService = searchCitizenByCpfService;
//# sourceMappingURL=index.js.map