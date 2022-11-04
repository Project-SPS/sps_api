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
exports.Procurado = void 0;
const typeorm_1 = require("typeorm");
const Cidadao_entity_1 = require("./Cidadao.entity");
let Procurado = class Procurado {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Procurado.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], Procurado.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Procurado.prototype, "data_criacao", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "date" }),
    __metadata("design:type", Date)
], Procurado.prototype, "data_modificacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Procurado.prototype, "esta_ativo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cidadao_entity_1.Cidadao),
    __metadata("design:type", Cidadao_entity_1.Cidadao)
], Procurado.prototype, "cidadao", void 0);
Procurado = __decorate([
    (0, typeorm_1.Entity)("procurados")
], Procurado);
exports.Procurado = Procurado;
//# sourceMappingURL=Procurado.entity.js.map