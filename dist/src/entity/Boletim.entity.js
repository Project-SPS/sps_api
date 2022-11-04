"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boletim = void 0;
const typeorm_1 = require("typeorm");
const Cidadao_entity_1 = require("./Cidadao.entity");
const Policial_entity_1 = require("./Policial.entity");
const Veiculo_entity_1 = require("./Veiculo.entity");
let Boletim = class Boletim {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Boletim.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], Boletim.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Boletim.prototype, "data_criacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Boletim.prototype, "data_atualizacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Boletim.prototype, "finalizado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Policial_entity_1.Policial, (policial) => policial.boletim),
    __metadata("design:type", Policial_entity_1.Policial)
], Boletim.prototype, "policial", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cidadao_entity_1.Cidadao, (cidadao) => cidadao.boletim),
    __metadata("design:type", Cidadao_entity_1.Cidadao)
], Boletim.prototype, "cidadao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Veiculo_entity_1.Veiculo, (veiculo) => veiculo.boletim),
    __metadata("design:type", Veiculo_entity_1.Veiculo)
], Boletim.prototype, "veiculo", void 0);
Boletim = __decorate([
    (0, typeorm_1.Entity)("boletins")
], Boletim);
exports.Boletim = Boletim;
//# sourceMappingURL=Boletim.entity.js.map