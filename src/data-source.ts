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
        // type: "postgres",
        // url: process.env.DATABASE_URL,
        // ssl: { rejectUnauthorized: false },
        // synchronize: false,
        // logging: true,
        // entities: ["dist/entity/*.js"],
        // migrations: ["dist/migrations/*.js"],
        type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: true,
        entities: ["src/entity/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);
