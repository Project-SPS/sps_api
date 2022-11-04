import sessionRoutes from "./sessions.routes";
import veiculosRoutes from "./veiculos.routes";
import { Express } from "express";
import policeRoutes from "./policiais.routes";

export const appRoutes = (app: Express) => {
  app.use("/veiculos", veiculosRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/policiais", policeRoutes);

};
