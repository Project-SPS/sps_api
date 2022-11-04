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
const VeiculoMulta_entity_1 = require("../../entity/VeiculoMulta.entity");
const Multa_entity_1 = require("../../entity/Multa.entity");
const retrieveVehicle_services_1 = __importDefault(require("./retrieveVehicle.services"));
const listVehicleFinesService = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const veiculoMultaRepository = data_source_1.AppDataSource.getRepository(VeiculoMulta_entity_1.VeiculoMulta);
    const multaRepository = data_source_1.AppDataSource.getRepository(Multa_entity_1.Multa);
    const veiculo = yield (0, retrieveVehicle_services_1.default)(identifier);
    const fines = yield veiculoMultaRepository.find({
        where: {
            veiculo: {
                id: veiculo.id,
            },
        },
        relations: {
            multa: true,
        },
    });
    return fines;
});
exports.default = listVehicleFinesService;
//# sourceMappingURL=listVehicleFines.services.js.map