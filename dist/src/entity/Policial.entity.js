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
exports.Policial = void 0;
const typeorm_1 = require("typeorm");
const Boletim_entity_1 = require("./Boletim.entity");
const Cidadao_entity_1 = require("./Cidadao.entity");
let Policial = class Policial {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Policial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], Policial.prototype, "cod_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Policial.prototype, "patente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Policial.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Policial.prototype, "administrador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Policial.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Policial.prototype, "data_criacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Policial.prototype, "data_atualizacao", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Cidadao_entity_1.Cidadao),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Cidadao_entity_1.Cidadao)
], Policial.prototype, "cidadao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Boletim_entity_1.Boletim, (boletim) => boletim.policial),
    __metadata("design:type", Array)
], Policial.prototype, "boletim", void 0);
Policial = __decorate([
    (0, typeorm_1.Entity)("policiais")
], Policial);
exports.Policial = Policial;
//# sourceMappingURL=Policial.entity.js.map