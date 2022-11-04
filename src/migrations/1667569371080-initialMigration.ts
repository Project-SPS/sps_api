import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1667569371080 implements MigrationInterface {
    name = 'initialMigration1667569371080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logradouro" character varying(120) NOT NULL, "numero" integer, "bairro" character varying(50) NOT NULL, "complemento" character varying(50), "cidade" character varying(50) NOT NULL, "estado" character varying(2) NOT NULL, "cep" character varying(8) NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "policiais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cod_registro" character varying NOT NULL, "patente" character varying(120) NOT NULL, "senha" character varying(120) NOT NULL, "administrador" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "data_criacao" date NOT NULL DEFAULT now(), "data_atualizacao" date NOT NULL DEFAULT now(), "cidadaoId" uuid, CONSTRAINT "UQ_4036304c82267fba7283fb3c63a" UNIQUE ("cod_registro"), CONSTRAINT "REL_1f2d80897e094e3f74ef4f09ba" UNIQUE ("cidadaoId"), CONSTRAINT "PK_a9eae817bd0a37d337ac70bd160" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procurados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), "data_modificacao" date NOT NULL DEFAULT now(), "esta_ativo" boolean NOT NULL DEFAULT true, "cidadaoId" uuid, CONSTRAINT "PK_028ffd15b0718574a18bdb877d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "multas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "valor" numeric(12,2) NOT NULL, CONSTRAINT "PK_ca3a598a9f7ce41173b7158c254" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculos_multas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL DEFAULT now(), "ativo" boolean NOT NULL DEFAULT true, "multaId" uuid, "veiculoId" uuid, CONSTRAINT "PK_7324c33009c89ef016ee4d71ba0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veiculos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placa" character varying(8) NOT NULL, "cor" character varying(50) NOT NULL, "modelo" character varying(50) NOT NULL, "marca" character varying(50) NOT NULL, "ano" integer, "chassi" character varying(17) NOT NULL, "cidadaoId" uuid, CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cidadaos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(120) NOT NULL, "idade" integer NOT NULL, "email" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "data_nascimento" date NOT NULL, "enderecoId" uuid, CONSTRAINT "UQ_68f3b7bbe4e72a108dcc97f22b8" UNIQUE ("email"), CONSTRAINT "UQ_b0e9037216d7369e60994f50689" UNIQUE ("cpf"), CONSTRAINT "REL_54d851f50f3f4230fd536af1be" UNIQUE ("enderecoId"), CONSTRAINT "PK_3ff2042dc6d2630da8c0def51df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boletins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), "data_atualizacao" date NOT NULL DEFAULT now(), "finalizado" boolean NOT NULL DEFAULT false, "policialId" uuid, "cidadaoId" uuid, "veiculoId" uuid, CONSTRAINT "PK_96278ceeac6527297efb1cde72e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "policiais" ADD CONSTRAINT "FK_1f2d80897e094e3f74ef4f09ba1" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procurados" ADD CONSTRAINT "FK_b152805ddbd6e4ea18a23f41408" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos_multas" ADD CONSTRAINT "FK_d318ce8b23b94bde23384b135d4" FOREIGN KEY ("multaId") REFERENCES "multas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos_multas" ADD CONSTRAINT "FK_24abdecb2f4cf2f688674ec5cfd" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veiculos" ADD CONSTRAINT "FK_08c99d53090f31df3d4e8318a23" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cidadaos" ADD CONSTRAINT "FK_54d851f50f3f4230fd536af1bef" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletins" ADD CONSTRAINT "FK_eed2ede55b2346ab14ca881c86e" FOREIGN KEY ("policialId") REFERENCES "policiais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletins" ADD CONSTRAINT "FK_26ea6c50d57c15b4ed790241792" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletins" ADD CONSTRAINT "FK_39202bcf3a83d8f3e8fd280101a" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boletins" DROP CONSTRAINT "FK_39202bcf3a83d8f3e8fd280101a"`);
        await queryRunner.query(`ALTER TABLE "boletins" DROP CONSTRAINT "FK_26ea6c50d57c15b4ed790241792"`);
        await queryRunner.query(`ALTER TABLE "boletins" DROP CONSTRAINT "FK_eed2ede55b2346ab14ca881c86e"`);
        await queryRunner.query(`ALTER TABLE "cidadaos" DROP CONSTRAINT "FK_54d851f50f3f4230fd536af1bef"`);
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_08c99d53090f31df3d4e8318a23"`);
        await queryRunner.query(`ALTER TABLE "veiculos_multas" DROP CONSTRAINT "FK_24abdecb2f4cf2f688674ec5cfd"`);
        await queryRunner.query(`ALTER TABLE "veiculos_multas" DROP CONSTRAINT "FK_d318ce8b23b94bde23384b135d4"`);
        await queryRunner.query(`ALTER TABLE "procurados" DROP CONSTRAINT "FK_b152805ddbd6e4ea18a23f41408"`);
        await queryRunner.query(`ALTER TABLE "policiais" DROP CONSTRAINT "FK_1f2d80897e094e3f74ef4f09ba1"`);
        await queryRunner.query(`DROP TABLE "boletins"`);
        await queryRunner.query(`DROP TABLE "cidadaos"`);
        await queryRunner.query(`DROP TABLE "veiculos"`);
        await queryRunner.query(`DROP TABLE "veiculos_multas"`);
        await queryRunner.query(`DROP TABLE "multas"`);
        await queryRunner.query(`DROP TABLE "procurados"`);
        await queryRunner.query(`DROP TABLE "policiais"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
