import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entity/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.HOST,
        port: process.env.PGPORT ? +process.env.PGPORT : 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: ["src/entity/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);
