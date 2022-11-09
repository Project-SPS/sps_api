import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { mockedCitizenNotFound, mockedSessions } from "../../mock";
import { hash } from "bcryptjs";

describe("Testes para a rota /cidadaos", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        connection = dataSource;
        const senhaHash = await hash(mockedSessions.senha, 10);

        await dataSource.query(
          `INSERT INTO enderecos (id, logradouro, numero, bairro, complemento, cidade, estado, cep)
      VALUES
        ('fade7ad9-0624-4d34-b684-1b08cbfa9928', 'Av. Efigênio Sales', 177, 'Japiim', null, 'Manaus', 'AM', '69023250'),
        ('3bb6c4c2-f2e5-4692-a935-cd07258b0600', 'Rua 14 de Janeiro', 14, 'Pérola', 'Atrás do Banco do Brasil', 'São Paulo', 'SP', '69000991');`
        );
        await dataSource.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento, "enderecoId")
      VALUES 
        ('9abcdcbb-2917-430a-94dd-2e1923bfe20d', 'Filipe', 23, 'filipe@gmail.com', '70238506274', '27/05/1999', 'fade7ad9-0624-4d34-b684-1b08cbfa9928'),
        ('9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', 'Vitor', 29, 'vitor@gmail.com', '12345678910', '27/05/1999', '3bb6c4c2-f2e5-4692-a935-cd07258b0600');`
        );
        await dataSource.query(
          `INSERT INTO veiculos (id, placa, cor, modelo, marca, chassi, "cidadaoId", ano) 
      VALUES 
        ('93063b57-6611-4792-ac6a-151a2fc6d3bf', 'ABC-0001', 'branco', 'Tiggo', 'Chery', '9BWSU19F08B302158', '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', 2022);
      `
        );
        await dataSource.query(
          `INSERT INTO policiais (id, patente, senha, administrador, ativo, data_criacao, data_atualizacao, "cidadaoId", cod_registro)
      VALUES 
        ('d54d0f18-a75e-4033-af45-e4b227afce9e', 'Coronel', '${senhaHash}', TRUE, TRUE, '20/10/2005', '20/10/2005', '9abcdcbb-2917-430a-94dd-2e1923bfe20d', '000000001'),
        ('e2e6cfce-1c09-4da1-a42b-e18405ccffa9', 'Cabo', '${senhaHash}', FALSE, TRUE, '20/10/2005', '20/10/2005', '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', '000000002');
      `
        );
        await dataSource.query(
          `INSERT INTO boletins (id, descricao, data_criacao, data_atualizacao, finalizado, "policialId", "cidadaoId", "veiculoId")
      VALUES 
        ('bd0662ee-fe1a-476d-9d56-83b38265bb79', 'Bateu no meu carro e fugiu', '01/01/1999', '01/02/1999', TRUE, 'd54d0f18-a75e-4033-af45-e4b227afce9e', '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', '93063b57-6611-4792-ac6a-151a2fc6d3bf');
      `
        );
        await dataSource.query(
          `INSERT INTO procurados (id, descricao, data_criacao, data_modificacao, esta_ativo, "cidadaoId")
      VALUES
        ('28b454d5-3629-473f-8f6d-652d87bff555', 'Causou um acidente de carro e fugiu deixando o dono do outro veículo lesado', '2022/11/04', '2022/11/04', TRUE, '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7');`
        );
      })
      .catch((error) => console.log(error));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /cidadaos - É possível listar todos os cidadãos", async () => {
    const login = await request(app).post("/sessions").send(mockedSessions);
    const response = await request(app).get("/cidadaos").set("Authorization", `Bearer ${login.body.token}`).send();

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("nome");
    expect(response.body[0]).toHaveProperty("idade");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("cpf");
    expect(response.body[0]).toHaveProperty("data_nascimento");
    expect(response.body[0]).toHaveProperty("policial");
    expect(response.body[0]).toHaveProperty("boletim");
    expect(response.body[0]).toHaveProperty("veiculo");
    expect(response.body[0]).toHaveProperty("procurado");
    expect(response.body[0]).toHaveProperty("endereco");
  });

  test("GET /cidadaos/:cpf - É possível encontrar o cidadão pelo cpf", async () => {
    const login = await request(app).post("/sessions").send(mockedSessions);
    const citizenFound = await request(app).get("/cidadaos").set("Authorization", `Bearer ${login.body.token}`).send();
    const cpf = citizenFound.body[0].cpf;
    const response = await request(app).get(`/cidadaos/${cpf}`).set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("nome");
    expect(response.body).toHaveProperty("idade");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("data_nascimento");
    expect(response.body).toHaveProperty("policial");
    expect(response.body).toHaveProperty("boletim");
    expect(response.body).toHaveProperty("veiculo");
    expect(response.body).toHaveProperty("procurado");
    expect(response.body).toHaveProperty("endereco");
  });

  test("GET /cidadaos/:cpf - Não deve ser possível encontrar um cidadão sem registro", async () => {
    const login = await request(app).post("/sessions").send(mockedSessions);
    const citizenFound = await request(app).get("/cidadaos");
    const response = await request(app)
      .get(`/cidadaos/${mockedCitizenNotFound.cpf}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).not.toBe(citizenFound.body[0]);
    expect(response.body).toHaveProperty("message");
  });
});
