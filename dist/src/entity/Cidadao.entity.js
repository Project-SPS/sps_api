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
exports.Cidadao = void 0;
const typeorm_1 = require("typeorm");
const Endereco_entity_1 = require("./Endereco.entity");
const Boletim_entity_1 = require("./Boletim.entity");
const Policial_entity_1 = require("./Policial.entity");
const Procurado_entity_1 = require("./Procurado.entity");
const Veiculo_entity_1 = require("./Veiculo.entity");
let Cidadao = class Cidadao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Cidadao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Cidadao.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Cidadao.prototype, "idade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120, unique: true }),
    __metadata("design:type", String)
], Cidadao.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 11, unique: true }),
    __metadata("design:type", String)
], Cidadao.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Cidadao.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Policial_entity_1.Policial),
    __metadata("design:type", Policial_entity_1.Policial)
], Cidadao.prototype, "policial", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Boletim_entity_1.Boletim, (boletim) => boletim.cidadao, { eager: true }),
    __metadata("design:type", Array)
], Cidadao.prototype, "boletim", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Veiculo_entity_1.Veiculo, (veiculo) => veiculo.cidadao, { eager: true }),
    __metadata("design:type", Array)
], Cidadao.prototype, "veiculo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Procurado_entity_1.Procurado, (procurado) => procurado.cidadao, { eager: true }),
    __metadata("design:type", Array)
], Cidadao.prototype, "procurado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Endereco_entity_1.Endereco, (endereco) => endereco.cidadao, { eager: true }),
    __metadata("design:type", Endereco_entity_1.Endereco)
], Cidadao.prototype, "endereco", void 0);
Cidadao = __decorate([
    (0, typeorm_1.Entity)("cidadaos")
], Cidadao);
exports.Cidadao = Cidadao;
//# sourceMappingURL=Cidadao.entity.js.map