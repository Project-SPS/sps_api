import { Blob } from "buffer";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Boletim } from "./Boletim";
import { Cidadao } from "./Cidadao";

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 8 })
  placa: string;

  @Column({ type: "varchar", length: 50 })
  cor: string;

  @Column({ type: "varchar", length: 50 })
  modelo: string;

  @Column({ type: "varchar", length: 50 })
  marca: string;

  @Column({ type: "year", length: 4 })
  ano: Date;

  @Column({ type: "varchar", length: 17 })
  chassi: string;

  @ManyToOne(() => Cidadao, (cidadao) => cidadao.veiculo)
  cidadao: Cidadao;

  @OneToMany(() => Boletim, (boletim) => boletim.veiculo)
  boletim: Boletim[];
}
