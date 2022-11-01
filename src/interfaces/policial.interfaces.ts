export interface IPolicialRequest {
  cod_registro: number;
  patente: string;
  senha: string;
  administrador: boolean;
}

export interface IPolicialResponse extends IPolicialRequest {
  id: string;
  ativo: boolean;
  data_criacao: Date;
  data_atualizacao: Date;
}

export interface IPolicialLogin {
  cod_registro: number;
  senha: string;
}
