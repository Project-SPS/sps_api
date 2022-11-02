import express from "express";
import { handleError } from "./middlewares";
import routes from './routes/cidadaos.routes'

const app = express();

app.use(express.json());
app.use(routes)
app.use(handleError);

export default app;
