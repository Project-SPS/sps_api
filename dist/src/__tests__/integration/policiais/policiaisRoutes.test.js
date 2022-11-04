"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const data_source_1 = require("../../../data-source");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mock_1 = require("../../mock");
const bcrypt = __importStar(require("bcryptjs"));
describe("/policiais", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((dataSource) => __awaiter(void 0, void 0, void 0, function* () {
            connection = dataSource;
            const hashedPassword = yield bcrypt.hash(mock_1.adminPoliceLogin.senha, 10);
            yield dataSource.query(`INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mock_1.mockedUUIDs[0]}', 'John Doe', '20', 'john@doe.com', '015.515.512-45', '01/01/1999')`);
            yield dataSource.query(`INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mock_1.mockedUUIDs[1]}', 'Java Script', '45', 'java@script.com', '564.423.512-01', '05/12/2004')`);
            yield dataSource.query(`INSERT INTO policiais (id, cod_registro, patente, senha, administrador, ativo, cidadaoId) VALUES ('${mock_1.mockedUUIDs[2]}', '${mock_1.adminPoliceLogin.cod_registro}', 'Tenente', '${hashedPassword}', 'true', 'true', '${mock_1.mockedUUIDs[0]}')`);
        }))
            .catch((error) => {
            console.log("Error during Data Source initialization", error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("POST /policiais - Deve ser possível criar um policial", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mock_1.mockedPolice);
        expect(registerResponse.status).toBe(201);
        expect(registerResponse.body).not.toHaveProperty("senha");
        expect(registerResponse.body).toHaveProperty("id");
        expect(registerResponse.body).toHaveProperty("cod_registro");
        expect(registerResponse.body).toHaveProperty("patente");
        expect(registerResponse.body).toHaveProperty("administrador");
        expect(registerResponse.body).toHaveProperty("data_criacao");
        expect(registerResponse.body).toHaveProperty("data_atualizacao");
        expect(registerResponse.body).toHaveProperty("ativo");
        expect(registerResponse.body).toHaveProperty("nome");
        expect(registerResponse.body).toHaveProperty("idade");
        expect(registerResponse.body).toHaveProperty("cpf");
        expect(registerResponse.body).toHaveProperty("email");
        expect(registerResponse.body).toHaveProperty("data_nascimento");
    }));
    it("POST /policiais - Não deve ser possível criar um policial não sendo administrador", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonAdminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
            .send(mock_1.mockedPolice);
        expect(registerResponse.status).toBe(403);
        expect(registerResponse.body).toHaveProperty("message");
    }));
    it("POST /policiais - Não deve ser possível criar um policial que já existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mock_1.mockedPolice);
        expect(registerResponse.status).toBe(400);
        expect(registerResponse.body).toHaveProperty("message");
    }));
    it("POST /policiais - Não deve ser possível criar um policial sem o código de registro", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mock_1.mockedPoliceWithoutRegistrationCode);
        expect(registerResponse.status).toBe(400);
        expect(registerResponse.body).toHaveProperty("message");
    }));
    it("POST /policiais - Não deve ser possível criar um policial sem senha", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mock_1.mockedPoliceWithoutPassword);
        expect(registerResponse.status).toBe(400);
        expect(registerResponse.body).toHaveProperty("message");
    }));
    it("POST /policiais - Não deve ser possível criar um policial sem patente", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const registerResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/policiais")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mock_1.mockedPoliceWithoutRank);
        expect(registerResponse.status).toBe(400);
        expect(registerResponse.body).toHaveProperty("message");
    }));
    it("GET /policiais - Deve ser possível listar todos os policiais", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const listResponse = yield (0, supertest_1.default)(app_1.default).get("/policiais").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toHaveLength(2);
    }));
    it("GET /policiais - Não deve ser possível listar todos os policial sem ser administrador", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonAdminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const listResponse = yield (0, supertest_1.default)(app_1.default).get("/policiais").set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`).send();
        expect(listResponse.status).toBe(403);
        expect(listResponse.body).toHaveProperty("message");
    }));
    it("GET /policiais/:cod_registro - Deve ser possível listar um policial por código de registro", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const listResponse = yield (0, supertest_1.default)(app_1.default)
            .get(`/policiais/${mock_1.mockedPolice.cod_registro}`)
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toHaveLength(1);
    }));
    it("GET /policiais/:cod_registro - Não deve ser possível listar um policial por código de registro sem ser administrador", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonAdminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const listResponse = yield (0, supertest_1.default)(app_1.default)
            .get(`/policiais/${mock_1.mockedPolice.cod_registro}`)
            .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
            .send();
        expect(listResponse.status).toBe(403);
        expect(listResponse.body).toHaveProperty("message");
    }));
    it("PATCH /policiais/:cod_registro - Deve ser possível o próprio policial atualizar sua senha.", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPassword = "novaSenha123!";
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const updateResponse = yield (0, supertest_1.default)(app_1.default)
            .patch(`/policiais/${mock_1.mockedPolice.cod_registro}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send({ senha: newPassword });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty("id");
        expect(updateResponse.body).toHaveProperty("cod_registro");
        expect(updateResponse.body).toHaveProperty("patente");
        expect(updateResponse.body).toHaveProperty("administrador");
        expect(updateResponse.body).toHaveProperty("data_criacao");
        expect(updateResponse.body).toHaveProperty("data_atualizacao");
        expect(updateResponse.body).toHaveProperty("nome");
        expect(updateResponse.body).toHaveProperty("idade");
        expect(updateResponse.body).toHaveProperty("cpf");
        expect(updateResponse.body).toHaveProperty("email");
        expect(updateResponse.body).toHaveProperty("data_nascimento");
        mock_1.nonAdminPoliceLogin.senha = newPassword;
        const newLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        expect(newLoginResponse.status).toBe(200);
        expect(newLoginResponse.body).toHaveProperty("token");
    }));
    it("PATCH /policiais/:cod_registro - Não deve ser possível um policial alterar outro policial.", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const updateResponse = yield (0, supertest_1.default)(app_1.default)
            .patch(`/policiais/${mock_1.adminPoliceLogin.cod_registro}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send({ patente: "Recruta" });
        expect(updateResponse.status).toBe(403);
        expect(updateResponse.body).toHaveProperty("message");
    }));
    it("PATCH /policiais/:cod_registro - Deve ser possível um administrador atualizar outro policial.", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateData = {
            administrador: true,
            patente: "Comandante Geral",
            senha: "novaSenha",
        };
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const updateResponse = yield (0, supertest_1.default)(app_1.default)
            .patch(`/policiais/${mock_1.nonAdminPoliceLogin.cod_registro}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(Object.assign({}, updateData));
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty("id");
        expect(updateResponse.body).toHaveProperty("cod_registro");
        expect(updateResponse.body).toHaveProperty("patente");
        expect(updateResponse.body.patente).toEqual(updateData.patente);
        expect(updateResponse.body).toHaveProperty("administrador");
        expect(updateResponse.body.administrador).toEqual(updateData.administrador);
        expect(updateResponse.body).toHaveProperty("data_criacao");
        expect(updateResponse.body).toHaveProperty("data_atualizacao");
        expect(updateResponse.body).toHaveProperty("nome");
        expect(updateResponse.body).toHaveProperty("ativo");
        expect(updateResponse.body).toHaveProperty("idade");
        expect(updateResponse.body).toHaveProperty("cpf");
        expect(updateResponse.body).toHaveProperty("email");
        expect(updateResponse.body).toHaveProperty("data_nascimento");
        mock_1.nonAdminPoliceLogin.senha = updateData.senha;
        const newLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        expect(newLoginResponse.status).toBe(200);
        expect(newLoginResponse.body).toHaveProperty("token");
    }));
    it("DELETE /policiais/:cod_registro - Deve ser possível realizar o soft delete", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.adminPoliceLogin);
        const deleteResponse = yield (0, supertest_1.default)(app_1.default)
            .delete(`/policiais/${mock_1.nonAdminPoliceLogin.cod_registro}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send();
        expect(deleteResponse.status).toBe(204);
    }));
    it("DELELE /policiais/:cod_registro - Não deve ser possível realizar o soft delete sem ser administrador.", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.nonAdminPoliceLogin);
        const deleteResponse = yield (0, supertest_1.default)(app_1.default)
            .delete(`/policiais/${mock_1.mockedPolice.cod_registro}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send();
        expect(deleteResponse.status).toBe(403);
        expect(deleteResponse.body).toHaveProperty("message");
    }));
});
//# sourceMappingURL=policiaisRoutes.test.js.map