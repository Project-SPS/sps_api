import * as bcrypt from "bcryptjs";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import { adminPoliceLogin, mockedUUIDs, mockedWantedCititzen } from "../../mock";
import app from "../../../app";

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

  it("POST /procurados - Deve ser possível registrar um cidadão como procurado.", async () => {
    const adminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const wantedResponse = await request(app)
      .post("/procurados/")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedWantedCititzen);

    expect(wantedResponse.status).toBe(201);
    expect(wantedResponse.body).toHaveProperty("id");
    expect(wantedResponse.body).toHaveProperty("descricao");
    expect(wantedResponse.body).toHaveProperty("data_criacao");
    expect(wantedResponse.body).toHaveProperty("data_modificacao");
    expect(wantedResponse.body).toHaveProperty("ativo");
    expect(wantedResponse.body).toHaveProperty("cidadao");
  });

  it("GET /procurados - Deve", async () => {});
});
