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
  let invalidCpf = "99999999998";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;

        await res.query(
          "INSERT INTO multas(id, descricao, valor) VALUES ('f9380c90-37eb-4116-95b8-017c2c7c6d84', 'avançar o sinal vermelho', '293.47') RETURNING id;"
        );

        await res.query(
          "INSERT INTO enderecos(id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES ('52e53cc3-f071-4eec-abe9-a4cb932ca26a', 'Rua da Compensa', '23', 'Compensa', 'apto 01', 'Manaus', 'AM', '70707070') RETURNING id;"
        );

        await res.query(
          `INSERT INTO cidadaos(id, nome, idade, email, data_nascimento, "enderecoId", cpf) VALUES ('8eacefda-26c4-47bd-9c96-acc082706401', 'Filipe Judiss', '23', 'filipebrabo@gmail.com', '1999/10/12', '52e53cc3-f071-4eec-abe9-a4cb932ca26a', '99999999999') RETURNING id;`
        );

        await res.query(
          `INSERT INTO veiculos(id, placa, cor, modelo, marca, ano, chassi, "cidadaoId") VALUES ('d296c8b1-6681-4664-a3a4-5ca03bd5f6b5', 'pdf-0001', 'prata', 'Tiggo3', 'Chery', '2021', 'xxxxxxxxxxxxxxxxy', '8eacefda-26c4-47bd-9c96-acc082706401');`
        );

        await res.query(
          `INSERT INTO policiais (id, cod_registro, patente, senha, administrador, ativo, "cidadaoId") VALUES ('f45aa9a8-43b6-441d-badd-516533fc0121', '987654321', 'Tenente', '$2a$10$gDRF06cY6P3a9wof8GAMSOWcRUOo/VWJi57VzeD6hAgSq3QTcb9T2', 'true', 'true', '8eacefda-26c4-47bd-9c96-acc082706401');`  
        );
      })
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /veiculos/:identifier - Deve ser possível listar um veículo", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(`/veiculos/${identifier}`).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("placa");
    expect(result.body).toHaveProperty("cor");
    expect(result.body).toHaveProperty("modelo");
    expect(result.body).toHaveProperty("marca");
    expect(result.body).toHaveProperty("ano");
    expect(result.body).toHaveProperty("chassi");
  });

  test("GET /veiculos/:identifier - Deve retornar erro se o identificador (placa ou chassi) não estiver cadastrado", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(`/veiculos/${invalidIdentifier}`).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /veiculos/multas/:identifier - Deve ser possível multar um veículo", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app)
      .post(`/veiculos/multas/${identifier}`)
      .send({ multaId }).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /veiculos/multas/:identifier - Não deve ser possível multar um veículo com identificador inválido", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app)
      .post(`/veiculos/multas/${invalidIdentifier}`)
      .send({ multaId }).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("POST /veiculos/multas/:identifier - Não deve ser possível multar um veículo com código da multa (id) inválido", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app)
      .post(`/veiculos/multas/${identifier}`)
      .send({ multaId: "invalido" }).set("Authorization", `Bearer ${login.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("GET /veiculos/multas/:identifier - Deve ser possível listar as multas de um veículo", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(`/veiculos/multas/${identifier}`).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("data");
    expect(result.body[0]).toHaveProperty("ativo");
    expect(result.body[0].multa).toHaveProperty("id");
    expect(result.body[0].veiculo).toHaveProperty("id");
  });

  test("GET /veiculos/multas/:identifier - Não deve ser possível listar as multas de um veículo com identificador inválido", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(
      `/veiculos/multas/${invalidIdentifier}`
    ).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("GET /veiculos/cidadao/:cpf - Deve ser possível listar os carros de um cidadão usando seu cpf", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(`/veiculos/cidadao/${cpf}`).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body[0]).toHaveProperty("id");
    expect(result.body[0]).toHaveProperty("placa");
    expect(result.body[0]).toHaveProperty("cor");
    expect(result.body[0]).toHaveProperty("modelo");
    expect(result.body[0]).toHaveProperty("marca");
    expect(result.body[0]).toHaveProperty("ano");
    expect(result.body[0]).toHaveProperty("chassi");
  });

  test("GET /veiculos/cidadao/:cpf - Não deve ser possível listar os carros de um cidadão com cpf não cadastrado", async () => {
    const login = await request(app).post("/sessions").send({
      cod_registro: "987654321",
      senha: "1234"
    })
    const result = await request(app).get(`/veiculos/cidadao/${invalidCpf}`).set("Authorization", `Bearer ${login.body.token}`).send();

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });
});
