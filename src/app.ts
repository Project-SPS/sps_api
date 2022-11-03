import 'reflect-metadata'
import 'express-async-errors'
import express from "express";
import routes from './routes/cidadaos.routes'
import { handleErrorMiddleware } from './middlewares/handleError.middleware';

const app = express();

app.use(express.json());

app.use(routes)

app.use(handleErrorMiddleware);

export default app;
