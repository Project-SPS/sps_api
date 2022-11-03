export interface IPolicialRequest {
  cod_registro: number;
  patente: string;
  senha: string;
  administrador: boolean;
}

export interface IPolicialResponse {
  id: string;
  ativo: boolean;
  data_criacao: Date;
  data_atualizacao: Date;
  cod_registro: number;
  patente: string;
  administrador: boolean;
}

export interface IPolicialLogin {
  cod_registro: number;
  senha: string;
}
