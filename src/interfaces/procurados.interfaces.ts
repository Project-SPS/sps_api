export interface IProcurados {
  descricao: string;
  data_criacao: Date;
  esta_ativo: boolean;
  data_modificacao: Date;
  cidadao_id: string;
  image?: any
}

export interface IProcuradosUpdate {
  esta_ativo: boolean;
}
