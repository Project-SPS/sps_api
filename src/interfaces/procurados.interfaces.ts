export interface IProcurados {
  descricao: string;
  esta_ativo?: boolean;
  data_criacao?: Date;
  data_modificacao?: Date;
  policialId: string;
  veiculoId?: string;
  cidadaoId: string;
}

export interface IProcuradosUpdate {
  esta_ativo: boolean;
}
