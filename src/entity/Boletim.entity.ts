// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
// import { Cidadao } from "./Cidadao.entity";
// import { Policial } from "./Policial.entity";
// import { Veiculo } from "./Veiculo.entity";

// @Entity("boletins")
// export class Boletim {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column({ type: "varchar", length: 500 })
//   descricao: string;

//   @CreateDateColumn({ type: "date" })
//   data_criacao: Date;

//   @UpdateDateColumn({ type: "date" })
//   data_atualizacao: Date;

//   @Column({ type: "boolean", default: false })
//   finalizado: boolean;

//   // @ManyToOne(() => Policial, (policial) => policial.boletim)
//   // policial: Policial;

//   // @ManyToOne(() => Cidadao, (cidadao) => cidadao.boletim)
//   // cidadao: Cidadao;

//   // @ManyToOne(() => Veiculo, (veiculo) => veiculo.boletim)
//   // veiculo: Veiculo;
// }
