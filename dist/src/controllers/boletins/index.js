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
exports.updateBulletinController = exports.listBulletinVehicleController = exports.listBulletinCitizenController = exports.listBulletinController = exports.createBulletinController = void 0;
const AppError_1 = require("../../errors/AppError");
const createBulletin_services_1 = __importDefault(require("../../services/boletim/createBulletin.services"));
const updateBulletin_services_1 = __importDefault(require("../../services/boletim/updateBulletin.services"));
const listBulletinCitizen_services_1 = __importDefault(require("../../services/boletim/listBulletinCitizen.services"));
const listBulletinVehicle_services_1 = __importDefault(require("../../services/boletim/listBulletinVehicle.services"));
const listBulletin_services_1 = __importDefault(require("../../services/boletim/listBulletin.services"));
const createBulletinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const create = yield (0, createBulletin_services_1.default)(data);
    return res.status(201).json(create);
});
exports.createBulletinController = createBulletinController;
const updateBulletinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const update = yield (0, updateBulletin_services_1.default)(data, id);
    return res.status(201).json(update);
});
exports.updateBulletinController = updateBulletinController;
const listBulletinCitizenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cpf = req.params.cpf;
    const list = yield (0, listBulletinCitizen_services_1.default)(cpf);
    return res.status(200).json(list);
});
exports.listBulletinCitizenController = listBulletinCitizenController;
const listBulletinVehicleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const placa = req.params.placa;
        const list = yield (0, listBulletinVehicle_services_1.default)(placa);
        return res.status(201).json(list);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
    }
});
exports.listBulletinVehicleController = listBulletinVehicleController;
const listBulletinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bulletin = yield (0, listBulletin_services_1.default)(id);
    return res.status(201).json(bulletin);
});
exports.listBulletinController = listBulletinController;
//# sourceMappingURL=index.js.map