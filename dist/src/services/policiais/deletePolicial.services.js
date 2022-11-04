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
const Policial_entity_1 = require("../../entity/Policial.entity");
const AppError_1 = require("../../errors/AppError");
const deletePolicialService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const policeRepository = data_source_1.AppDataSource.getRepository(Policial_entity_1.Policial);
    const police = yield policeRepository.findOneBy({ id });
    if (!police) {
        throw new AppError_1.AppError("Invalid id", 404);
    }
    if (police.ativo === false) {
        throw new AppError_1.AppError("Unable to delete inactive user", 400);
    }
    yield policeRepository.update(id, {
        ativo: false
    });
});
exports.default = deletePolicialService;
//# sourceMappingURL=deletePolicial.services.js.map