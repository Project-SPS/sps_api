import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Boletim } from "./Boletim";
import { Policial } from "./Policial";
import { Veiculo } from "./Veiculo";

@Entity()
export class Cidadao {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120 })
  nome: string;

  @Column({ type: "integer", length: 3 })
  idade: number;

  @Column({ type: "varchar", length: 120, unique: true })
  email: string;

  @Column({ type: "varchar", length: 14, unique: true })
  cpf: string;

  @Column({ type: "date" })
  data_nascimento: Date;

  @OneToOne(() => Policial)
  policial: Policial;

  @OneToMany(() => Boletim, (boletim) => boletim.cidadao)
  boletim: Boletim[];

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cidadao)
  veiculo: Veiculo[];
}
