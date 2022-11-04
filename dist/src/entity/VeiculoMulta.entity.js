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
exports.VeiculoMulta = void 0;
const typeorm_1 = require("typeorm");
const Multa_entity_1 = require("./Multa.entity");
const Veiculo_entity_1 = require("./Veiculo.entity");
let VeiculoMulta = class VeiculoMulta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], VeiculoMulta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VeiculoMulta.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], VeiculoMulta.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Multa_entity_1.Multa, { eager: true }),
    __metadata("design:type", Multa_entity_1.Multa)
], VeiculoMulta.prototype, "multa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Veiculo_entity_1.Veiculo, { eager: true }),
    __metadata("design:type", Veiculo_entity_1.Veiculo)
], VeiculoMulta.prototype, "veiculo", void 0);
VeiculoMulta = __decorate([
    (0, typeorm_1.Entity)("veiculos_multas")
], VeiculoMulta);
exports.VeiculoMulta = VeiculoMulta;
//# sourceMappingURL=VeiculoMulta.entity.js.map