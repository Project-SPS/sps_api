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
exports.createVehicleFineController = exports.listVehicleFinesController = exports.listCitizenVehiclesController = exports.retrieveVehicleController = void 0;
const createVehicleFine_services_1 = __importDefault(require("../../services/veiculos/createVehicleFine.services"));
const listCitizenVehicles_services_1 = __importDefault(require("../../services/veiculos/listCitizenVehicles.services"));
const listVehicleFines_services_1 = __importDefault(require("../../services/veiculos/listVehicleFines.services"));
const retrieveVehicle_services_1 = __importDefault(require("../../services/veiculos/retrieveVehicle.services"));
const retrieveVehicleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.params;
    const veiculo = yield (0, retrieveVehicle_services_1.default)(identifier);
    return res.status(200).json(veiculo);
});
exports.retrieveVehicleController = retrieveVehicleController;
const listCitizenVehiclesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf } = req.params;
    const vehicles = yield (0, listCitizenVehicles_services_1.default)(cpf);
    return res.status(200).json(vehicles);
});
exports.listCitizenVehiclesController = listCitizenVehiclesController;
const listVehicleFinesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.params;
    const fines = yield (0, listVehicleFines_services_1.default)(identifier);
    return res.status(200).json(fines);
});
exports.listVehicleFinesController = listVehicleFinesController;
const createVehicleFineController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.params;
    const { multaId } = req.body;
    yield (0, createVehicleFine_services_1.default)(identifier, multaId);
    return res.status(201).send({
        message: "Vehicle fine created",
    });
});
exports.createVehicleFineController = createVehicleFineController;
//# sourceMappingURL=index.js.map