// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
// import { Boletim } from "./Boletim.entity";
// import { Cidadao } from "./Cidadao.entity";

// @Entity("policiais")
// export class Policial {
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column({ type: "integer", unique: true })
//   cod_registro: number;

//   @Column({ type: "varchar", length: 120 })
//   patente: string;

//   @Column({ type: "varchar", length: 120 })
//   senha: string;

//   @Column({ type: "boolean", default: false })
//   administrador: boolean;

//   @Column({ type: "boolean", default: true })
//   ativo: boolean;

//   @CreateDateColumn({ type: "date" })
//   data_criacao: Date;

//   @UpdateDateColumn({ type: "date" })
//   data_atualizacao: Date;

//   @OneToOne(() => Cidadao)
//   @JoinColumn()
//   cidadao: Cidadao;

//   @OneToMany(() => Boletim, (boletim) => boletim.policial)
//   boletim: Boletim[];
// }
