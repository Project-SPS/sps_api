"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedPoliceWithoutPassword = exports.mockedPoliceWithoutRank = exports.mockedPoliceWithoutRegistrationCode = exports.nonAdminPoliceLogin = exports.mockedPolice = exports.adminPoliceLogin = exports.mockedUUIDs = void 0;
exports.mockedUUIDs = [
    "cd43fa71-7a34-4e76-9251-e8e742a97849",
    "c41ec2e3-43b6-441d-badd-516533fc0121",
    "d7902755-339b-4c9c-96d1-810d45645a89",
];
exports.adminPoliceLogin = {
    cod_registro: "123456789",
    senha: "123456",
};
exports.mockedPolice = {
    administrador: false,
    cod_registro: "987654321",
    patente: "Soldado",
    senha: "nklfesf745ds",
};
exports.nonAdminPoliceLogin = {
    cod_registro: exports.mockedPolice.cod_registro,
    senha: exports.mockedPolice.senha,
};
exports.mockedPoliceWithoutRegistrationCode = {
    administrador: false,
    patente: "Soldado",
    senha: "nklfesf745ds",
};
exports.mockedPoliceWithoutRank = {
    administrador: false,
    cod_registro: 54135131,
    senha: "nklfesf745ds",
};
exports.mockedPoliceWithoutPassword = {
    administrador: false,
    cod_registro: 78451245,
    patente: "Capitão",
};
//# sourceMappingURL=index.js.map