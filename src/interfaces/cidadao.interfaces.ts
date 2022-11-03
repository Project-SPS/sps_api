export interface ICidadao {
 id: string
 nome: string
 idade: number
 email: string
 cpf: string
 data_nascimento: Date
 policial?: any
 boletim?: any
 veiculo?: any
 procurado?: any
 endereco?: ICidadaoEndereco
}

export interface ICidadaoEndereco {
 id: string
 logradouro: string
 numero: number
 bairro: string
 complemento: string
 cidade: string
 estado: string
 cep: string
 cidadao?: ICidadao
}