import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("enderecos")
export class Endereco {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 120 })
  logradouro: string;

  @Column({ type: "integer", nullable: true })
  numero: number;

  @Column({ type: "varchar", length: 50 })
  bairro: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  complemento: string;

  @Column({ type: "varchar", length: 50 })
  cidade: string;

  @Column({ type: "varchar", length: 2 })
  estado: string;

  @Column({ type: "varchar", length: 10 })
  cep: string;
}
