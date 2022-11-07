import "reflect-metadata";
import "express-async-errors";
import express from "express";
import boletimRouter from "./routes/boletim.routes";
import { appRoutes } from "./routes";
import { handleErrorMiddleware } from "./middlewares";

const app = express();
app.use(express.json());

app.use("/boletim", boletimRouter);

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
