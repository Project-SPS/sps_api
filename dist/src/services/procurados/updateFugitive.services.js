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
const AppError_1 = require("../../errors/AppError");
const updateFugitiveService = (body, cpf) => __awaiter(void 0, void 0, void 0, function* () {
    const fugitivesRepository = data_source_1.AppDataSource.getRepository(Procurado_entity_1.Procurado);
    const fugitiveExists = fugitivesRepository.find({
        relations: {
            cidadao: true,
        },
    });
    if (!fugitiveExists) {
        throw new AppError_1.AppError("Procurado não existe", 404);
    }
    yield fugitivesRepository.update(cpf, body);
    return;
});
exports.default = updateFugitiveService;
//# sourceMappingURL=updateFugitive.services.js.map