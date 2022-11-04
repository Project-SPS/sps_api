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
describe('Testes para a rota /cidadaos', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((dataSource) => __awaiter(void 0, void 0, void 0, function* () {
            connection = dataSource;
            yield dataSource.query(`INSERT INTO enderecos (id, logradouro, numero, bairro, complemento, cidade, estado, cep)
      VALUES
        ('fade7ad9-0624-4d34-b684-1b08cbfa9928', 'Av. Efigênio Sales', 177, 'Japiim', null, 'Manaus', 'AM', '69023250'),
        ('3bb6c4c2-f2e5-4692-a935-cd07258b0600', 'Rua 14 de Janeiro', 14, 'Pérola', 'Atrás do Banco do Brasil', 'São Paulo', 'SP', '69000991');`);
            yield dataSource.query(`INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento, "enderecoId")
      VALUES 
        ('40d747f9-e836-4c8a-b898-b5d7ab474d3b', 'Filipe', 23, 'filipe@gmail.com', '70238506274', '27/05/1999', 'fade7ad9-0624-4d34-b684-1b08cbfa9928'),
        ('780c4fa5-39e9-48e9-9a90-2184ffbe0255', 'Vitor', 29, 'vitor@gmail.com', '12345678910', '27/05/1999', '3bb6c4c2-f2e5-4692-a935-cd07258b0600');`);
        }))
            .catch((error) => console.log(error));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test('GET /cidadaos - É possível listar todos os cidadãos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/cidadaos');
        expect(response.status).toBe(200);
    }));
    test('GET /cidadaos/:cpf - É possível encontrar o cidadão pelo cpf', () => __awaiter(void 0, void 0, void 0, function* () {
        const citizenFound = yield (0, supertest_1.default)(app_1.default).get('/cidadaos');
        const cpf = citizenFound.body[0].cpf;
        const response = yield (0, supertest_1.default)(app_1.default).get(`/cidadaos/${cpf}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome");
        expect(response.body).toHaveProperty("idade");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("cpf");
        expect(response.body).toHaveProperty("data_nascimento");
        expect(response.body).toHaveProperty("endereco");
    }));
    test("GET /cidadaos/:cpf - Não deve ser possível encontrar um cidadão não cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const citizenFound = yield (0, supertest_1.default)(app_1.default).get('/cidadaos');
        const cpf = citizenFound.body[0].cpf;
        const response = yield (0, supertest_1.default)(app_1.default).get(`/cidadaos/${cpf}`);
        expect(response.status).toBe(404);
        expect(response.body).not.toBe(citizenFound.body[0]);
        expect(response.body).toHaveProperty("message");
    }));
});
//# sourceMappingURL=cidadaos.test.spec.js.map