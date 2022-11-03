import 'reflect-metadata'
import 'express-async-errors'
import express from "express";
import { handleError } from "./middlewares";
import { appRoutes } from './routes/index'    

const app = express();

app.use(express.json());

appRoutes(app);

app.use(handleError);

export default app;
