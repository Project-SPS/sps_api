import express from "express";
import { handleError } from "./middlewares";
import policeRoutes from "./routes/policiais.routes";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());

appRoutes(app);

app.use(handleError);

app.use("/policiais", policeRoutes);

export default app;
