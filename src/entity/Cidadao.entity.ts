import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
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

  @OneToOne(() => Policial, (policial) => policial.cidadao)
  policial: Policial;

  @OneToMany(() => Boletim, (boletim) => boletim.cidadao, { eager: false })
  boletim: Boletim[];

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cidadao, { eager: false })
  veiculo: Veiculo[];

  @OneToMany(() => Procurado, (procurado) => procurado.cidadao, {
    eager: false,
  })
  procurado: Procurado[];

  @ManyToOne(() => Endereco, (endereco) => endereco.cidadao, { eager: false })
  endereco: Endereco;
}
