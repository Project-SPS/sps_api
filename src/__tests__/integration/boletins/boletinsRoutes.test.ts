import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUUIDs } from "../../mock";
import * as bcrypt from "bcryptjs";

describe("/boletim", () => {
  let connection: DataSource;

  const hashedPassword = bcrypt.hashSync("1234", 10);
  let boletimId: string;

  const mockedPoliceLogin = {
    cod_registro: "123456789",
    senha: "1234",
  };

  const mockedBoletim = {
    descricao: "boletim teste",
    finalizado: false,
    policial_id: mockedUUIDs[1],
    cidadao_id: "8eacefda-26c4-47bd-9c96-acc082706401",
    veiculo_id: "d296c8b1-6681-4664-a3a4-5ca03bd5f6b5",
  };

  const mockedBoletimWithoutVehicle = {
    descricao: "boletim teste sem veículo",
    finalizado: false,
    policial_id: mockedUUIDs[1],
    cidadao_id: "8eacefda-26c4-47bd-9c96-acc082706401",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;

        await res.query(
          "INSERT INTO enderecos(id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES ('52e53cc3-f071-4eec-abe9-a4cb932ca26a', 'Rua da Compensa', '23', 'Compensa', 'apto 01', 'Manaus', 'AM', '70707070') RETURNING id;"
        );

        await res.query(
          "INSERT INTO enderecos(id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES ('67b3fb65-3954-4ecb-81f5-bc6bf1088c80', 'Rua Teste', '23', 'Compensa', 'apto 01', 'Manaus', 'AM', '80808080') RETURNING id;"
        );

        await res.query(
          `INSERT INTO cidadaos(id, nome, idade, email, data_nascimento, "enderecoId", cpf) VALUES ('8eacefda-26c4-47bd-9c96-acc082706401', 'Filipe Judiss', '23', 'filipebrabo@gmail.com', '1999/10/12', '52e53cc3-f071-4eec-abe9-a4cb932ca26a', '99999999999') RETURNING id;`
        );

        await res.query(
          `INSERT INTO cidadaos(id, nome, idade, email, data_nascimento, "enderecoId", cpf) VALUES ('${mockedUUIDs[0]}', 'nao admin', '23', 'naoadmin@gmail.com', '1999/10/12', '67b3fb65-3954-4ecb-81f5-bc6bf1088c80', '88888888888') RETURNING id;`
        );

        await res.query(
          `INSERT INTO veiculos(id, placa, cor, modelo, marca, ano, chassi, "cidadaoId") VALUES ('d296c8b1-6681-4664-a3a4-5ca03bd5f6b5', 'pdf-0001', 'prata', 'Tiggo3', 'Chery', '2021', 'xxxxxxxxxxxxxxxxy', '8eacefda-26c4-47bd-9c96-acc082706401');`
        );

        await res.query(
          `INSERT INTO policiais (id, cod_registro, patente, senha, administrador, ativo, "cidadaoId") VALUES ('${mockedUUIDs[1]}', '123456789', 'cabo', '${hashedPassword}', 'false', 'true', '${mockedUUIDs[0]}')`
        );
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser possível criar um boletim sem veículo", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app)
      .post("/boletim")
      .set("Authorization", `Bearer ${notAdminLogin.body.token}`)
      .send(mockedBoletimWithoutVehicle);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("descricao");
    expect(result.body).toHaveProperty("data_criacao");
    expect(result.body).toHaveProperty("data_atualizacao");
    expect(result.body).toHaveProperty("finalizado");
    expect(result.body).toHaveProperty("cidadao");
  });

  test("Deve ser possível criar um boletim", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).post("/boletim").set("Authorization", `Bearer ${notAdminLogin.body.token}`).send(mockedBoletim);

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body).toHaveProperty("descricao");
    expect(result.body).toHaveProperty("data_criacao");
    expect(result.body).toHaveProperty("data_atualizacao");
    expect(result.body).toHaveProperty("finalizado");
    expect(result.body).toHaveProperty("cidadao");
    expect(result.body).toHaveProperty("veiculo");

    boletimId = result.body.id;
  });

  test("Não deve ser possível criar um boletim com token inválido", async () => {
    const result = await request(app).post("/boletim").set("Authorization", `Bearer invalid_token`).send(mockedBoletim);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty("message");
  });

  test("Deve ser possível listar um boletim pelo seu id", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/${boletimId}`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id");
  });

  test("Não deve ser possível listar um boletim com id inválido", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/invalidId`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("Deve ser possível atualizar o status de um boletim", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app)
      .patch(`/boletim/${boletimId}`)
      .set("Authorization", `Bearer ${notAdminLogin.body.token}`)
      .send({ finalizado: true });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty("id");
    expect(result.body.finalizado).toBe(true);
  });

  test("Não deve ser possível atualizar outras colunas do boletim", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app)
      .patch(`/boletim/${boletimId}`)
      .set("Authorization", `Bearer ${notAdminLogin.body.token}`)
      .send({ descricao: "nova descricao", finalizado: true });

    expect(result.status).toBe(201);
    expect(result.body.descricao).not.toBe("nova descricao");
  });

  test("Deve ser possível listar os boletins de um cidadão pelo seu cpf", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/cidadao/99999999999`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body).toHaveLength(2);
  });

  test("Não deve ser possível listar os boletins de um cidadão com CPF inválido", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/cidadao/99999999998`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });

  test("Deve ser possível listar os boletins de um veículo pela sua placa", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/veiculo/pdf-0001`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("map");
    expect(result.body).toHaveLength(1);
  });

  test("Não deve ser possível listar os boletins de um veículo com placa inválida", async () => {
    const notAdminLogin = await request(app).post("/sessions").send(mockedPoliceLogin);

    const result = await request(app).get(`/boletim/veiculo/pdf-0000`).set("Authorization", `Bearer ${notAdminLogin.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty("message");
  });
});
