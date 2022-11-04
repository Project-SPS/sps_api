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
const data_source_1 = require("../../data-source");
const Procurado_entity_1 = require("../../entity/Procurado.entity");
const Cidadao_entity_1 = require("../../entity/Cidadao.entity");
const AppError_1 = require("../../errors/AppError");
const createFugitiveServices = (fugitive) => __awaiter(void 0, void 0, void 0, function* () {
    const fugitivesRepository = data_source_1.AppDataSource.getRepository(Procurado_entity_1.Procurado);
    const citiziensRepository = data_source_1.AppDataSource.getRepository(Cidadao_entity_1.Cidadao);
    const getCitiezen = yield citiziensRepository.findOneBy({
        id: fugitive.cidadao_id,
    });
    if (!getCitiezen) {
        throw new AppError_1.AppError("Cidadão não encontrado", 404);
    }
    const newFugitive = new Procurado_entity_1.Procurado();
    newFugitive.descricao = fugitive.descricao;
    newFugitive.esta_ativo = fugitive.esta_ativo;
    fugitivesRepository.create(newFugitive);
    yield fugitivesRepository.save(newFugitive);
    return fugitive;
});
exports.default = createFugitiveServices;
//# sourceMappingURL=createFugitive.services.js.map