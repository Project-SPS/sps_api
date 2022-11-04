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
const Veiculo_entity_1 = require("../../entity/Veiculo.entity");
const AppError_1 = require("../../errors/AppError");
const retrieveVehicleService = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const veiculoRepository = data_source_1.AppDataSource.getRepository(Veiculo_entity_1.Veiculo);
    let veiculo;
    if (identifier.length === 8) {
        veiculo = yield veiculoRepository.findOneBy({ placa: identifier });
    }
    else if (identifier.length === 17) {
        veiculo = yield veiculoRepository.findOneBy({ chassi: identifier });
    }
    else {
        throw new AppError_1.AppError("Bad request", 400);
    }
    if (!veiculo) {
        throw new AppError_1.AppError("Vehicle not found!", 404);
    }
    return veiculo;
});
exports.default = retrieveVehicleService;
//# sourceMappingURL=retrieveVehicle.services.js.map