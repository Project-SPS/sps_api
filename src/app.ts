import express from "express";
import { handleError } from "./middlewares";
import sessionRoutes from "./routes/sessions.routes";

const app = express();

app.use(express.json());
app.use(handleError);

app.use("/sessions", sessionRoutes);

export default app;
