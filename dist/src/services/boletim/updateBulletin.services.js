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
const Boletim_entity_1 = require("../../entity/Boletim.entity");
const AppError_1 = require("../../errors/AppError");
const data_source_1 = require("../../data-source");
const boletim_serializer_1 = require("../../serializer/boletim.serializer");
const updateBulletinService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSerializer = yield boletim_serializer_1.updateBulletinSerializer.validate(data);
    const boletimRepository = data_source_1.AppDataSource.getRepository(Boletim_entity_1.Boletim);
    const findBoletim = yield boletimRepository.findOneBy({ id });
    if (!findBoletim) {
        throw new AppError_1.AppError("Boletim de ocorrencia não encontrado", 401);
    }
    yield boletimRepository.update(id, { finalizado: data.finalizado });
    const boletim = yield boletimRepository.findOneBy({ id });
    return boletim;
});
exports.default = updateBulletinService;
//# sourceMappingURL=updateBulletin.services.js.map