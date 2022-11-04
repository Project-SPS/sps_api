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
const Multa_entity_1 = require("../../entity/Multa.entity");
const VeiculoMulta_entity_1 = require("../../entity/VeiculoMulta.entity");
const AppError_1 = require("../../errors/AppError");
const retrieveVehicle_services_1 = __importDefault(require("./retrieveVehicle.services"));
const createVehicleFineService = (identifier, multaId) => __awaiter(void 0, void 0, void 0, function* () {
    const multaRepository = yield data_source_1.AppDataSource.getRepository(Multa_entity_1.Multa);
    const veiculoMultaRepository = yield data_source_1.AppDataSource.getRepository(VeiculoMulta_entity_1.VeiculoMulta);
    const vehicle = yield (0, retrieveVehicle_services_1.default)(identifier);
    const fine = yield multaRepository.findOneBy({
        id: multaId,
    });
    if (!fine) {
        throw new AppError_1.AppError("Fine not found", 404);
    }
    yield veiculoMultaRepository.save({
        veiculo: vehicle,
        multa: fine,
    });
});
exports.default = createVehicleFineService;
//# sourceMappingURL=createVehicleFine.services.js.map