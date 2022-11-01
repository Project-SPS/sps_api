import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("/policiais", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        connection = dataSource;
      })
      .catch((error) => {
        console.log("Error during Data Source initialization", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("/POST policiais - Deve ser possível criar um policial", () => {});
});
