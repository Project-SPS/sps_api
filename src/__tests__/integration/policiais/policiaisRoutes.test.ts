import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("/policiais", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        connection = dataSource;
        const id = await dataSource.query(
          "INSERT INTO cidadaos (nome, idade, email, cpf, data_nascimento) VALUES ('John Doe', '20', 'john@doe.com', '015.515.512-45', '01/01/1999') RETURNING id"
        );
        console.log("id", id);
        // dataSource.query("INSERT INTO policiais (cod_registro, patente, senha, eh_adm, esta_ativo, id_cidadaos) VALUES ");
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("/POST policiais - Apenas administradores podem criar um policial", async () => {
    // const nonAdminLoginResponse = await request(app).post("/login").send();
  });

  it("/POST policiais - Deve ser possível criar um policial", () => {});
});
