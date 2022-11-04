export interface IVehicleRequest {
  placa?: string;
  chassi?: string;
}

export interface ICitizenVehiclesRequest {
  cpf: string;
}

export interface ICreateVehicleFineRequest extends IVehicleRequest {
  multaId: string;
}
