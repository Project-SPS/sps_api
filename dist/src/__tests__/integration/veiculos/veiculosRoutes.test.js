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
const data_source_1 = require("../../../data-source");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
describe("Testando rotas de veículos", () => {
    let connection;
    let identifier = "pdf-0001";
    let invalidIdentifier = "pdf-9999";
    let multaId = "f9380c90-37eb-4116-95b8-017c2c7c6d84";
    let cpf = "99999999999";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            connection = res;
            yield res.query("INSERT INTO veiculos(id, placa, cor, modelo, marca, ano, chassi) VALUES ('d296c8b1-6681-4664-a3a4-5ca03bd5f6b5', 'pdf-0001', 'prata', 'Tiggo3', 'Chery', '2021', 'xxxxxxxxxxxxxxxxy');");
            yield res.query("INSERT INTO multas(id, descricao, valor) VALUES ('f9380c90-37eb-4116-95b8-017c2c7c6d84', 'avançar o sinal vermelho', '293.47') RETURNING id;");
            yield res.query("INSERT INTO enderecos(id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES ('52e53cc3-f071-4eec-abe9-a4cb932ca26a', 'Rua da Compensa', '23', 'Compensa', 'apto 01', 'Manaus', 'AM', '70707070') RETURNING id;");
            yield res.query(`INSERT INTO cidadaos(id, nome, idade, email, data_nascimento, "enderecoId", cpf) VALUES ('8eacefda-26c4-47bd-9c96-acc082706401', 'Filipe Judiss', '23', 'filipebrabo@gmail.com', '1999/10/12', '52e53cc3-f071-4eec-abe9-a4cb932ca26a', '99999999999') RETURNING id;`);
        }))
            .catch((err) => console.error("Error during data source initialization", err));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Deve ser possível listar um veículo", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get(`/veiculos/${identifier}`);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("placa");
        expect(result.body).toHaveProperty("cor");
        expect(result.body).toHaveProperty("modelo");
        expect(result.body).toHaveProperty("marca");
        expect(result.body).toHaveProperty("ano");
        expect(result.body).toHaveProperty("chassi");
    }));
    // test("Deve retornar erro se o identificador (placa ou chassi) não estiver cadastrado", async () => {
    //   const result = await request(app).get(`/veiculos/${invalidIdentifier}`);
    //   expect(result.status).toBe(404);
    //   expect(result.body).toHaveProperty("message");
    // });
    test("Deve ser possível criar uma multa para um veículo", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/veiculos/multas/${identifier}`)
            .send({ multaId });
        expect(result.status).toBe(201);
        expect(result.body).toHaveProperty("message");
    }));
    test("Deve ser possível listar as multas de um veículo", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get(`/veiculos/multas/${identifier}`);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("map");
        expect(result.body[0]).toHaveProperty("id");
        expect(result.body[0]).toHaveProperty("data");
        expect(result.body[0]).toHaveProperty("ativo");
        expect(result.body[0].multa).toHaveProperty("id");
        expect(result.body[0].veiculo).toHaveProperty("id");
    }));
    test("Deve ser possível listar os carros de um cidadão usando seu cpf", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get(`/veiculos/cidadao/${cpf}`);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("map");
        expect(result.body[0]).toHaveProperty("");
    }));
});
//# sourceMappingURL=veiculosRoutes.test.js.map