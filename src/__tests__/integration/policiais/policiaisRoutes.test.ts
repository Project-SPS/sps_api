import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  adminPoliceLogin,
  mockedPolice,
  mockedPoliceWithoutPassword,
  mockedPoliceWithoutRank,
  mockedPoliceWithoutRegistrationCode,
  mockedUUIDs,
  nonAdminPoliceLogin,
} from "../../mock";
import * as bcrypt from "bcryptjs";

describe("/policiais", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        connection = dataSource;
        const hashedPassword = await bcrypt.hash(adminPoliceLogin.senha, 10);

        await dataSource.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mockedUUIDs[0]}', 'John Doe', '20', 'john@doe.com', '015.515.512-45', '01/01/1999')`
        );
        await dataSource.query(
          `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento) VALUES ('${mockedUUIDs[1]}', 'Java Script', '45', 'java@script.com', '564.423.512-01', '05/12/2004')`
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

  it("GET /policiais - Não deve ser possível listar todos os policial sem ser administrador", async () => {});
  it("GET /policiais - Deve ser possível listar todos os policiais", async () => {});
  it("GET /policiais/:id - Deve ser possível listar um policial por código de registro", async () => {});

  it("POST /policiais - Deve ser possível criar um policial", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPolice);

    expect(registerResponse.status).toBe(201);

    expect(registerResponse.body).not.toHaveProperty("senha");

    expect(registerResponse.body).toHaveProperty("id");
    expect(registerResponse.body).toHaveProperty("cod_registro");
    expect(registerResponse.body).toHaveProperty("patente");
    expect(registerResponse.body).toHaveProperty("administrador");
    expect(registerResponse.body).toHaveProperty("data_criacao");
    expect(registerResponse.body).toHaveProperty("data_atualizacao");
    expect(registerResponse.body).toHaveProperty("nome");
    expect(registerResponse.body).toHaveProperty("idade");
    expect(registerResponse.body).toHaveProperty("cpf");
    expect(registerResponse.body).toHaveProperty("email");
    expect(registerResponse.body).toHaveProperty("data_nascimento");
  });

  it("POST /policiais - Não deve ser possível criar um policial não sendo administrador", async () => {
    const nonAdminLoginResponse = await request(app).post("/login").send(nonAdminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
      .send(mockedPolice);

    expect(registerResponse.status).toBe(403);
    expect(registerResponse.body).toHaveProperty("message");
  });

  it("POST /policiais - Não deve ser possível criar um policial que já existe", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPolice);

    expect(registerResponse.status).toBe(400);
    expect(registerResponse.body).toHaveProperty("message");
  });

  it("POST /policiais - Não deve ser possível criar um policial sem o código de registro", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPoliceWithoutRegistrationCode);

    expect(registerResponse.status).toBe(400);
    expect(registerResponse.body).toHaveProperty("message");
  });

  it("POST /policiais - Não deve ser possível criar um policial sem senha", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPoliceWithoutPassword);

    expect(registerResponse.status).toBe(400);
    expect(registerResponse.body).toHaveProperty("message");
  });

  it("POST /policiais - Não deve ser possível criar um policial sem patente", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPoliceWithoutRank);

    expect(registerResponse.status).toBe(400);
    expect(registerResponse.body).toHaveProperty("message");
  });

  it("UPDATE /policiais/:id - Apenas o próprio usuário pode atualizar sua senha.", async () => {
    const loginResponse = await request(app).post("/login").send(nonAdminPoliceLogin);
    //pegar o policial

    const updateResponse = await request(app)
      .patch("/policiais/")
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({ senha: "novaSenha123!" });
  });
});
