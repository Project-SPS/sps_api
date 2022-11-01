import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { adminPoliceLogin, mockedPolice, mockedUUIDs } from "../../mock";
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

  it("/POST policiais - Apenas administradores podem criar um policial", async () => {
    const nonAdminLoginResponse = await request(app).post("/login").send(adminPoliceLogin);
    const registerResponse = await request(app)
      .post("/policiais")
      .set("Authorization", `Bearer ${nonAdminLoginResponse.body.token}`)
      .send(mockedPolice);

    expect(registerResponse.body).toHaveProperty("message");
    expect(registerResponse.status).toBe(403);
  });

  it("/POST policiais - Deve ser possível criar um policial", () => {});
});
