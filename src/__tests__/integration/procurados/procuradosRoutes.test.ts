import * as bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { adminPoliceLogin, mockedUUIDs, mockedWantedCititzen } from "../../mock";
import app from "../../../app";

describe("/procurados", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        connection = dataSource;
        const hashedPassword = await bcrypt.hash(adminPoliceLogin.senha, 10);

        await dataSource.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mockedUUIDs[0]}', 'John Doe', '20', 'john@doe.com', '01551551245', '01/01/1999')`
        );
        await dataSource.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mockedUUIDs[1]}', 'Java Script', '45', 'java@script.com', '56442351201', '05/12/2004')`
        );
        await dataSource.query(
          `INSERT INTO policiais (id, cod_registro, patente, senha, administrador, ativo, cidadaoId) VALUES ('${mockedUUIDs[2]}', '${adminPoliceLogin.cod_registro}', 'Tenente', '${hashedPassword}', 'true', 'true', '${mockedUUIDs[0]}')`
        );
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /procurados - Deve ser possível registrar um cidadão como procurado.", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const wantedResponse = await request(app)
      .post("/procurados")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedWantedCititzen);

    expect(wantedResponse.status).toBe(201);
    expect(wantedResponse.body).toHaveProperty("id");
    expect(wantedResponse.body).toHaveProperty("descricao");
    expect(wantedResponse.body).toHaveProperty("data_criacao");
    expect(wantedResponse.body).toHaveProperty("data_modificacao");
    expect(wantedResponse.body).toHaveProperty("esta_ativo");
    expect(wantedResponse.body).toHaveProperty("cidadao");
  });

  it("GET /procurados - Deve ser possível encontrar todos os procurados", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const wantedResponse = await request(app).get("/procurados").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send();

    expect(wantedResponse.status).toBe(200);
    expect(wantedResponse.body[0]).toHaveProperty("id");
    expect(wantedResponse.body[0]).toHaveProperty("descricao");
    expect(wantedResponse.body[0]).toHaveProperty("data_criacao");
    expect(wantedResponse.body[0]).toHaveProperty("data_modificacao");
    expect(wantedResponse.body[0]).toHaveProperty("esta_ativo");
    expect(wantedResponse.body[0]).toHaveProperty("cidadao");
  });

  it("GET /procurados/:cpf - Deve ser possível encontrar um procurado pelo CPF", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const wantedResponse = await request(app)
      .get("/procurados/01551551245")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send();

    expect(wantedResponse.status).toBe(200);
    expect(wantedResponse.body[0]).toHaveProperty("id");
    expect(wantedResponse.body[0]).toHaveProperty("descricao");
    expect(wantedResponse.body[0]).toHaveProperty("data_criacao");
    expect(wantedResponse.body[0]).toHaveProperty("data_modificacao");
    expect(wantedResponse.body[0]).toHaveProperty("esta_ativo");
    expect(wantedResponse.body[0]).toHaveProperty("cidadao");
  });

  it("PATCH /procurados/:cpf - Deve ser possível atualizar o status do procurado por CPF", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const wantedResponse = await request(app)
      .patch("/procurados/01551551245")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ esta_ativo: false });

    expect(wantedResponse.status).toBe(200);
    expect(wantedResponse.body[0]).toHaveProperty("id");
    expect(wantedResponse.body[0]).toHaveProperty("descricao");
    expect(wantedResponse.body[0]).toHaveProperty("data_criacao");
    expect(wantedResponse.body[0]).toHaveProperty("data_modificacao");
    expect(wantedResponse.body[0]).toHaveProperty("esta_ativo");
    expect(wantedResponse.body[0].esta_ativo).toBe(false);
    expect(wantedResponse.body[0]).toHaveProperty("cidadao");
  });

  it("PATCH /procurados/:cpf - Não deve ser possível atualizar a descrição de um procurado", async () => {
    const adminLoginResponse = await request(app).post("/sessions").send(adminPoliceLogin);
    const wantedResponse = await request(app)
      .patch("/procurados/01551551245")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send({ descricao: "ghostface" });

    expect(wantedResponse.status).toBe(400);
    expect(wantedResponse.body).toHaveProperty("message");
  });
});
