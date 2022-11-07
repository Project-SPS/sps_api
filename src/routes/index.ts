import sessionRoutes from "./sessions.routes";
import veiculosRoutes from "./veiculos.routes";
import { Express } from "express";
import policeRoutes from "./policiais.routes";
import boletimRoutes from "./boletim.routes";
import multasRoutes from "./multas.routes";
import procuradosRoutes from "./procurados.routes";

export const appRoutes = (app: Express) => {
  app.use("/veiculos", veiculosRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/policiais", policeRoutes);
  app.use("/multas", multasRoutes);
  app.use("/boletim", boletimRoutes);
  app.use("/procurados", procuradosRoutes);
};
