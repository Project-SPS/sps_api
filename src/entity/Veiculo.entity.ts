import { Blob } from "buffer";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Boletim } from "./Boletim.entity";
import { Cidadao } from "./Cidadao.entity";
import { VeiculoMulta } from "./VeiculoMulta.entity";

@Entity("veiculos")
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

  @Column({ type: "integer" })
  ano: number;

  @Column({ type: "varchar", length: 17 })
  chassi: string;

  @ManyToOne(() => Cidadao, (cidadao) => cidadao.veiculo)
  cidadao: Cidadao;

  @OneToMany(() => Boletim, (boletim) => boletim.veiculo)
  boletim: Boletim[];

  @OneToMany(() => VeiculoMulta, (veiculoMulta) => veiculoMulta.veiculo)
  veiculoMulta: VeiculoMulta[];
}
