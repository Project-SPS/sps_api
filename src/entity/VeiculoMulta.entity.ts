import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Multa } from "./Multa.entity";
import { Veiculo } from "./Veiculo.entity";

@Entity("veiculos_multas")
export class VeiculoMulta {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  data: Date;

  @Column({ type: "boolean", default: true })
  ativo: boolean;

  @ManyToOne(() => Multa, { eager: true })
  multa: Multa;

  @ManyToOne(() => Veiculo, { eager: true })
  veiculo: Veiculo;
}
