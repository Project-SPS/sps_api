import express from "express";
import { handleError } from "./middlewares";
import veiculosRouter from "./routes/veiculos.routes";

const app = express();

app.use(express.json());
app.use(handleError);
app.use("/veiculos", veiculosRouter);

export default app;
