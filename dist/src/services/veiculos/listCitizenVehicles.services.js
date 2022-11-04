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
const Cidadao_entity_1 = require("../../entity/Cidadao.entity");
const Veiculo_entity_1 = require("../../entity/Veiculo.entity");
const AppError_1 = require("../../errors/AppError");
const listCitizenVehiclesService = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleRepository = data_source_1.AppDataSource.getRepository(Veiculo_entity_1.Veiculo);
    const citizenRepository = data_source_1.AppDataSource.getRepository(Cidadao_entity_1.Cidadao);
    const citizen = yield citizenRepository.findOneBy({ cpf });
    if (!citizen) {
        throw new AppError_1.AppError("Citizen not found", 404);
    }
    const vehicles = yield vehicleRepository.find({
        where: {
            cidadao: {
                id: citizen.id,
            },
        },
    });
    return vehicles;
});
exports.default = listCitizenVehiclesService;
//# sourceMappingURL=listCitizenVehicles.services.js.map