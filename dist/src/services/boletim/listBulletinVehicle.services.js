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
const Veiculo_entity_1 = require("../../entity/Veiculo.entity");
const data_source_1 = require("../../data-source");
const AppError_1 = require("../../errors/AppError");
const listBulletinVehicleService = (placa) => __awaiter(void 0, void 0, void 0, function* () {
    const boletimRepository = data_source_1.AppDataSource.getRepository(Boletim_entity_1.Boletim);
    const vehicleRepository = data_source_1.AppDataSource.getRepository(Veiculo_entity_1.Veiculo);
    const findVehicle = yield vehicleRepository.findOneBy({ placa });
    if (!findVehicle) {
        throw new AppError_1.AppError("veículo não existe", 401);
    }
    const findBoletim = yield boletimRepository.find({ relations: { veiculo: true }, where: { veiculo: { id: findVehicle.id } } });
    if (findBoletim.length === 0) {
        throw new AppError_1.AppError("Veículo sem boletins", 201);
    }
    return findBoletim;
});
exports.default = listBulletinVehicleService;
//# sourceMappingURL=listBulletinVehicle.services.js.map