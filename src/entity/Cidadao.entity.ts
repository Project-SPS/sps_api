import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Endereco } from "./Endereco.entity";
import { Boletim } from "./Boletim.entity";
import { Policial } from "./Policial.entity";
import { Procurado } from "./Procurado.entity";
import { Veiculo } from "./Veiculo.entity";

@Entity("cidadaos")
export class Cidadao {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120 })
  nome: string;

  @Column({ type: "integer" })
  idade: number;

  @Column({ type: "varchar", length: 120, unique: true })
  email: string;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf: string;

  @Column({ type: "date" })
  data_nascimento: Date;

  @OneToOne(() => Policial, { eager: true })
  policial: Policial;

  @OneToMany(() => Boletim, (boletim) => boletim.cidadao, { eager: true })
  boletim: Boletim[];

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cidadao, { eager: true })
  veiculo: Veiculo[];

  @OneToMany(() => Procurado, (procurado) => procurado.cidadao, { eager: true })
  procurado: Procurado[];

  @ManyToOne(() => Endereco, (endereco) => endereco.cidadao, { eager: true })
  endereco: Endereco;
}
