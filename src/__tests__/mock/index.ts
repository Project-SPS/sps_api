import { IPolicialLogin, IPolicialRequest } from "../../interfaces/policial.interfaces";

export const mockedUUIDs = [
  "cd43fa71-7a34-4e76-9251-e8e742a97849",
  "c41ec2e3-43b6-441d-badd-516533fc0121",
  "d7902755-339b-4c9c-96d1-810d45645a89",
];

export const adminPoliceLogin: IPolicialLogin = {
  cod_registro: 123456789,
  senha: "123456",
};

export const mockedPolice: IPolicialRequest = {
  administrador: false,
  cod_registro: 987654321,
  patente: "Soldado",
  senha: "nklfesf745ds",
};
