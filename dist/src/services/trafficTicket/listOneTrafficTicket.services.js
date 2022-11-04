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
const Multa_entity_1 = require("../../entity/Multa.entity");
const listOneTrafficTicketService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trafficTicketRepository = data_source_1.AppDataSource.getRepository(Multa_entity_1.Multa);
    const trafficTicket = yield trafficTicketRepository.findOneBy({
        id,
    });
    if (!trafficTicket) {
        //throw new AppError(404, "Multa não econtrada");
    }
    return trafficTicket;
});
exports.default = listOneTrafficTicketService;
//# sourceMappingURL=listOneTrafficTicket.services.js.map