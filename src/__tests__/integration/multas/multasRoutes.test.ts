import * as bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { adminPoliceLogin, mockedUUIDs } from "../../mock";

describe("Testando rotas de veículos", () => {
  let connection: DataSource;
  let identifier: string = "pdf-0001";
  let invalidIdentifier: string = "pdf-9999";
  let multaId = "f9380c90-37eb-4116-95b8-017c2c7c6d84";
  let invalidMultaId = "f9380c90-37eb-4116-95b8-017c2c7c6d85";
  let cpf = "99999999999";
  let invalidCpf = "99999999998";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;

        const hashedPassword = await bcrypt.hash(adminPoliceLogin.senha, 10);

        await res.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mockedUUIDs[0]}', 'John Doe', '20', 'john@doe.com', '015.515.512-45', '01/01/1999')`
        );
        await res.query(
          `INSERT INTO policiais (id, cod_registro, patente, senha, administrador, ativo, cidadaoId) VALUES ('${mockedUUIDs[2]}', '${adminPoliceLogin.cod_registro}', 'Tenente', '${hashedPassword}', 'true', 'true', '${mockedUUIDs[0]}')`
        );

        await res.query(
          "INSERT INTO multas(id, descricao, valor) VALUES ('f9380c90-37eb-4116-95b8-017c2c7c6d84', 'avançar o sinal vermelho', '293.47') RETURNING id;"
        );
      })
      .catch((err) => console.error("Error during data source initialization", err));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser possível listar o acervo de multas", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const result = await request(app).get("/multas").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("descricao");
    expect(result.body[0]).toHaveProperty("valor");
  });

  test("Deve ser possível listar uma multa pelo id", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const result = await request(app).get(`/multas/${multaId}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("descricao");
    expect(result.body).toHaveProperty("valor");
  });

  test("Não deve ser possível listar uma multa com id inválido", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const result = await request(app).get(`/multas/${invalidMultaId}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });
});
