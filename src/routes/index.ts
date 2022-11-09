import sessionRoutes from "./sessions.routes";
import veiculosRoutes from "./veiculos.routes";
import { Express } from "express";
import policeRoutes from "./policiais.routes";
import cidadaosRoutes from "./cidadaos.routes";
import boletimRoutes from "./boletim.routes";
import multasRoutes from "./multas.routes";
import procuradosRoutes from "./procurados.routes";

export const appRoutes = (app: Express) => {
  app.use("/veiculos", veiculosRoutes);
  app.use("/sessions", sessionRoutes);
  app.use("/policiais", policeRoutes);
  app.use("/cidadaos", cidadaosRoutes);
  app.use("/multas", multasRoutes);
  app.use("/boletins", boletimRoutes);
  app.use("/procurados", procuradosRoutes);
};
