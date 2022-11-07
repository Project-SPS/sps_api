import "reflect-metadata";
import "express-async-errors";
import express from "express";
import boletimRouter from "./routes/boletim.routes";
import procuradosRoutes from "./routes/procurados.routes";
import cidadaosRoutes from "./routes/cidadaos.routes";
import { handleErrorMiddleware } from "./middlewares";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use("/cidadao", cidadaosRoutes);
appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
