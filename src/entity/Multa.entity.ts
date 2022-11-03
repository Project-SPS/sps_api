// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { VeiculoMulta } from "./VeiculoMulta.entity";

// @Entity("multas")
// export class Multa {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column({ type: "varchar", length: 500 })
//   descricao: string;

//   @Column({ type: "decimal", precision: 12, scale: 2 })
//   valor: number;

//   @OneToMany(() => VeiculoMulta, (veiculoMulta) => veiculoMulta.multa)
//   veiculoMulta: VeiculoMulta[];
// }
