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
exports.Veiculo = void 0;
const typeorm_1 = require("typeorm");
const Boletim_entity_1 = require("./Boletim.entity");
const Cidadao_entity_1 = require("./Cidadao.entity");
const VeiculoMulta_entity_1 = require("./VeiculoMulta.entity");
let Veiculo = class Veiculo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Veiculo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 8 }),
    __metadata("design:type", String)
], Veiculo.prototype, "placa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Veiculo.prototype, "cor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Veiculo.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Veiculo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Veiculo.prototype, "ano", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 17 }),
    __metadata("design:type", String)
], Veiculo.prototype, "chassi", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cidadao_entity_1.Cidadao, (cidadao) => cidadao.veiculo),
    __metadata("design:type", Cidadao_entity_1.Cidadao)
], Veiculo.prototype, "cidadao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Boletim_entity_1.Boletim, (boletim) => boletim.veiculo),
    __metadata("design:type", Array)
], Veiculo.prototype, "boletim", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => VeiculoMulta_entity_1.VeiculoMulta, (veiculoMulta) => veiculoMulta.veiculo),
    __metadata("design:type", Array)
], Veiculo.prototype, "veiculoMulta", void 0);
Veiculo = __decorate([
    (0, typeorm_1.Entity)("veiculos")
], Veiculo);
exports.Veiculo = Veiculo;
//# sourceMappingURL=Veiculo.entity.js.map