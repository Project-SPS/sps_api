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
//import { instanceToPlain } from "class-transformer";
const updateFugitive_services_1 = __importDefault(require("../../services/procurados/updateFugitive.services"));
const updateFugitiveController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { cpf } = req.params;
    const fugitive = yield (0, updateFugitive_services_1.default)(body, cpf);
    return res.status(200).json({ message: "Procurado atualizado!", fugitive });
});
exports.default = updateFugitiveController;
//# sourceMappingURL=updateFugitive.controllers.js.map