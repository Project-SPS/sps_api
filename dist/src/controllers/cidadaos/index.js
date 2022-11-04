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
exports.searchCitizenByCpfController = exports.listCitizensController = void 0;
const cidadaos_1 = require("../../services/cidadaos");
const listCitizensController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const cidadaos = yield (0, cidadaos_1.listCitizensService)();
    return response.status(200).json(cidadaos);
});
exports.listCitizensController = listCitizensController;
const searchCitizenByCpfController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf } = request.params;
    const cidadao = yield (0, cidadaos_1.searchCitizenByCpfService)(cpf);
    return response.status(200).json(cidadao);
});
exports.searchCitizenByCpfController = searchCitizenByCpfController;
//# sourceMappingURL=index.js.map