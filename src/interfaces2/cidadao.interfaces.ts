export interface ICidadaoRequest {
  nome: string;
  idade: number;
  email: string;
  cpf: string;
  data_nascimento: Date;
}

export interface ICidadaoResponse extends ICidadaoRequest {
  id: string;
}
