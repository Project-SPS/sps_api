import { IPolicialLogin, IPolicialRequest } from "../../interfaces/policial.interfaces";
import { IProcurados } from "../../interfaces/procurados.interfaces";

export const mockedUUIDs = [
  "cd43fa71-7a34-4e76-9251-e8e742a97849",
  "c41ec2e3-43b6-441d-badd-516533fc0121",
  "d7902755-339b-4c9c-96d1-810d45645a89",
];

export const adminPoliceLogin: IPolicialLogin = {
  cod_registro: "123456789",
  senha: "123456",
};

export const mockedPolice: IPolicialRequest = {
  administrador: false,
  cod_registro: "987654321",
  patente: "Soldado",
  senha: "nklfesf745ds",
};

export const nonAdminPoliceLogin: IPolicialLogin = {
  cod_registro: mockedPolice.cod_registro,
  senha: mockedPolice.senha,
};

export const mockedPoliceWithoutRegistrationCode = {
  administrador: false,
  patente: "Soldado",
  senha: "nklfesf745ds",
};

export const mockedPoliceWithoutRank = {
  administrador: false,
  cod_registro: 54135131,
  senha: "nklfesf745ds",
};

export const mockedPoliceWithoutPassword = {
  administrador: false,
  cod_registro: 78451245,
  patente: "Capitão",
};

export const mockedSessions = {
  cod_registro: '000000001',
  senha: '1234'
}

export const mockedSessionsWrongPassword = {
  cod_registro: '000000001',
  senha: '12345'
}

export const mockedSessionsWrongCodeRegister = {
  cod_registro: '00000000',
  senha: '12345'
}

export const mockedCitizenNotFound = {
  cpf: "12345654321"
}
export const mockedWantedCititzen: IProcurados = {
  cidadaoId: mockedUUIDs[0],
  descricao: "Procurado pela justiça.",
  policialId: mockedUUIDs[2],
};
