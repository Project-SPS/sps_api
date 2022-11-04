import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cidadao } from "./Cidadao.entity";

@Entity("procurados")
export class Procurado {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 500 })
  descricao: string;

  @CreateDateColumn({ type: "date" })
  data_criacao: Date;

  @UpdateDateColumn({ type: "date" })
  data_modificacao: Date;

  @Column({ type: "boolean", default: true })
  esta_ativo: boolean;

  @ManyToOne(() => Cidadao)
  cidadao: Cidadao;

  @Column({type: "varchar", length:250, nullable:true})
  image: string;
}
