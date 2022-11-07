import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("Testando rotas de veículos", () => {
  let connection: DataSource;
  let identifier: string = "pdf-0001";
  let invalidIdentifier: string = "pdf-9999";
  let multaId = "f9380c90-37eb-4116-95b8-017c2c7c6d84";
  let cpf = "99999999999";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;

        await res.query(
          "INSERT INTO veiculos(id, placa, cor, modelo, marca, ano, chassi) VALUES ('d296c8b1-6681-4664-a3a4-5ca03bd5f6b5', 'pdf-0001', 'prata', 'Tiggo3', 'Chery', '2021', 'xxxxxxxxxxxxxxxxy');"
        );

        await res.query(
          "INSERT INTO multas(id, descricao, valor) VALUES ('f9380c90-37eb-4116-95b8-017c2c7c6d84', 'avançar o sinal vermelho', '293.47') RETURNING id;"
        );

        await res.query(
          "INSERT INTO enderecos(id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES ('52e53cc3-f071-4eec-abe9-a4cb932ca26a', 'Rua da Compensa', '23', 'Compensa', 'apto 01', 'Manaus', 'AM', '70707070') RETURNING id;"
        );

        await res.query(
          `INSERT INTO cidadaos(id, nome, idade, email, data_nascimento, "enderecoId", cpf) VALUES ('8eacefda-26c4-47bd-9c96-acc082706401', 'Filipe Judiss', '23', 'filipebrabo@gmail.com', '1999/10/12', '52e53cc3-f071-4eec-abe9-a4cb932ca26a', '99999999999') RETURNING id;`
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
    const result = await request(app).get(`/veiculos/${identifier}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("placa");
    expect(result.body).toHaveProperty("cor");
    expect(result.body).toHaveProperty("modelo");
    expect(result.body).toHaveProperty("marca");
    expect(result.body).toHaveProperty("ano");
    expect(result.body).toHaveProperty("chassi");
  });

  // test("Deve retornar erro se o identificador (placa ou chassi) não estiver cadastrado", async () => {
  //   const result = await request(app).get(`/veiculos/${invalidIdentifier}`);

  //   expect(result.status).toBe(404);
  //   expect(result.body).toHaveProperty("message");
  // });

  test("Deve ser possível criar uma multa para um veículo", async () => {
    const result = await request(app)
      .post(`/veiculos/multas/${identifier}`)
      .send({ multaId });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message");
  });

  test("Deve ser possível listar as multas de um veículo", async () => {
    const result = await request(app).get(`/veiculos/multas/${identifier}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("data");
    expect(result.body[0]).toHaveProperty("ativo");
    expect(result.body[0].multa).toHaveProperty("id");
    expect(result.body[0].veiculo).toHaveProperty("id");
  });

  test("Deve ser possível listar os carros de um cidadão usando seu cpf", async () => {
    const result = await request(app).get(`/veiculos/cidadao/${cpf}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("");
  });
});
