import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("Testando rotas de veículos", () => {
  let connection: DataSource;
  let placa: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;

        placa = await res.query(
          "INSERT INTO veiculos(id, placa, cor, modelo, marca, ano, chassi) VALUES ('d296c8b1-6681-4664-a3a4-5ca03bd5f6b5', 'pdf-0001', 'prata', 'Tiggo3', 'Chery', '2021-10-10', 'xxxxxxxxxxxxxxxxy') RETURNING placa;"
        );
      })
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser possível listar um veículo", async () => {
    const result = await request(app).get("/veiculos").send({ placa });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
  });
});
