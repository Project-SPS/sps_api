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
const data_source_1 = require("../../data-source");
const AppError_1 = require("../../errors/AppError");
const Policial_entity_1 = require("../../entity/Policial.entity");
const Veiculo_entity_1 = require("../../entity/Veiculo.entity");
const Cidadao_entity_1 = require("../../entity/Cidadao.entity");
const boletim_serializer_1 = require("../../serializer/boletim.serializer");
const createBulletinService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serializerBulletim = yield boletim_serializer_1.createBulletinSerializer.validate(data, { stripUnknown: true, abortEarly: false });
    const cidadaoRepository = data_source_1.AppDataSource.getRepository(Cidadao_entity_1.Cidadao);
    const veiculoRepository = data_source_1.AppDataSource.getRepository(Veiculo_entity_1.Veiculo);
    const policialRepository = data_source_1.AppDataSource.getRepository(Policial_entity_1.Policial);
    const boletimRepository = data_source_1.AppDataSource.getRepository(Boletim_entity_1.Boletim);
    const findCidadao = yield cidadaoRepository.findOneBy({ id: data.cidadao_id });
    if (!findCidadao) {
        throw new AppError_1.AppError("Cidadão não existe", 401);
    }
    const findPolicial = yield policialRepository.findOneBy({ id: data.policial_id });
    if (!findPolicial) {
        throw new AppError_1.AppError("Policial não existe", 401);
    }
    if (data.veiculo_id) {
        const findVeiculo = yield veiculoRepository.findOneBy({ id: data.veiculo_id });
        if (!findVeiculo) {
            throw new AppError_1.AppError("Veículo não exite", 401);
        }
        const createBulletin = boletimRepository.create({ descricao: data.descricao, cidadao: findCidadao, policial: findPolicial, veiculo: findVeiculo });
        yield boletimRepository.save(createBulletin);
        return createBulletin;
    }
    const createBulletin = boletimRepository.create({ descricao: data.descricao, policial: findPolicial, cidadao: findCidadao });
    yield boletimRepository.save(createBulletin);
    return createBulletin;
});
exports.default = createBulletinService;
//# sourceMappingURL=createBulletin.services.js.map