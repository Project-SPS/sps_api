export interface IPolicialRequest {
  cod_registro: string;
  patente: string;
  senha: string;
  administrador: boolean;
}

export interface IPolicialResponse {
  id: string;
  ativo: boolean;
  data_criacao: Date;
  data_atualizacao: Date;
  cod_registro: string;
  patente: string;
  administrador: boolean;

}

export interface IPolicialLogin {
  cod_registro: string;
  senha: string;
}

export interface IPolicialUpdate {
  patente?: string;
  administrador?: boolean;
  senha?: string;
}
