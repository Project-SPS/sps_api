import 'reflect-metadata'
import 'express-async-errors'
import express from "express";
import veiculosRouter from "./routes/veiculos.routes";
import sessionRoutes from "./routes/sessions.routes";
import { handleErrorMiddleware } from './middlewares/handleError.middleware';
import cidadaosRoutes from './routes/cidadaos.routes';

const app = express();

app.use(express.json());

app.use("/veiculos", veiculosRouter);
app.use("/cidadaos", cidadaosRoutes)
app.use("/sessions", sessionRoutes);
app.use(handleErrorMiddleware);


export default app;
