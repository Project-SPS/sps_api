import express from "express";
import { handleError } from "./middlewares";

const app = express();

app.use(express.json());
app.use(handleError);

export default app;
