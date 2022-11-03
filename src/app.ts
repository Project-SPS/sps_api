import express from "express";
import { handleError } from "./middlewares";
import policeRoutes from "./routes/policiais.routes";

const app = express();

app.use(express.json());
app.use(handleError);

app.use("/policiais", policeRoutes);

export default app;
