export interface IBoletimRequest {
    descricao: string
    finalizado: boolean
    policial_id: string
    cidadao_id?: string
    veiculo_id?: string
}

export interface IBoletimUpdateRequest {
    finalizado: boolean
}