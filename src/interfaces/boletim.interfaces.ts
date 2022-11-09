import { Boletim } from "../entity/Boletim.entity";

export interface IBoletimRequest {
  descricao: string;
  finalizado: boolean;
  policial_id: string;
  cidadao_id?: string;
  veiculo_id?: string;
}

export interface IBoletimUpdateRequest {
  finalizado: boolean;
}

export interface IBoletimResponse extends Omit<Boletim, "policial"> {}
