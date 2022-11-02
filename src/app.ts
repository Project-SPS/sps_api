import express from "express";
import { handleError } from "./middlewares";
import boletimRouter from "./routes/boletim.routes";

const app = express();

app.use(express.json());
app.use("/boletim",boletimRouter)
app.use(handleError);

export default app;
