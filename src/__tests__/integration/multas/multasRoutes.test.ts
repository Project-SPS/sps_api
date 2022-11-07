import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

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

        await res.query(
          "INSERT INTO multas(id, descricao, valor) VALUES ('f9380c90-37eb-4116-95b8-017c2c7c6d84', 'avançar o sinal vermelho', '293.47') RETURNING id;"
        );
      })
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser possível listar o acervo de multas", async () => {
    const result = await request(app).get("/multas");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("descricao");
    expect(result.body[0]).toHaveProperty("valor");
  });

  test("Deve ser possível listar uma multa pelo id", async () => {
    const result = await request(app).get(`/multas/${multaId}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("descricao");
    expect(result.body).toHaveProperty("valor");
  });

  test("Não deve ser possível listar uma multa com id inválido", async () => {
    const result = await request(app).get(`/multas/${invalidMultaId}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });
});
