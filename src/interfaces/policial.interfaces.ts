export interface IPolicialRequest {
  cod_registro: string;
  patente: string;
  senha: string;
  administrador: boolean;
}

export interface IPolicialResponse {
  id: string;
  cod_registro: string;
  patente: string;
  administrador: boolean;
  ativo: boolean;
  data_criacao: Date;
  data_atualizacao: Date;
}

export interface IPolicialLogin {
  cod_registro: number;
  senha: string;
}

export interface IPolicialUpdate {
  patente?: string;
  administrador?: boolean;
  senha?: string;
}
