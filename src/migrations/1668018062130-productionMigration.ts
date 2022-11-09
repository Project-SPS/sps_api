import { MigrationInterface, QueryRunner } from "typeorm";

export class productionMigration1668018062130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logradouro" character varying(120) NOT NULL, "numero" integer, "bairro" character varying(50) NOT NULL, "complemento" character varying(50), "cidade" character varying(50) NOT NULL, "estado" character varying(2) NOT NULL, "cep" character varying(8) NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "policiais" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cod_registro" character varying(9) NOT NULL, "patente" character varying(120) NOT NULL, "senha" character varying(120) NOT NULL, "administrador" boolean NOT NULL DEFAULT false, "ativo" boolean NOT NULL DEFAULT true, "data_criacao" date NOT NULL DEFAULT now(), "data_atualizacao" date NOT NULL DEFAULT now(), "cidadaoId" uuid, CONSTRAINT "UQ_4036304c82267fba7283fb3c63a" UNIQUE ("cod_registro"), CONSTRAINT "REL_1f2d80897e094e3f74ef4f09ba" UNIQUE ("cidadaoId"), CONSTRAINT "PK_a9eae817bd0a37d337ac70bd160" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "procurados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), "data_modificacao" date NOT NULL DEFAULT now(), "esta_ativo" boolean NOT NULL DEFAULT true, "image" character varying(250), "cidadaoId" uuid, CONSTRAINT "PK_028ffd15b0718574a18bdb877d4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "multas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "valor" numeric(12,2) NOT NULL, CONSTRAINT "PK_ca3a598a9f7ce41173b7158c254" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "veiculos_multas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL DEFAULT now(), "ativo" boolean NOT NULL DEFAULT true, "multaId" uuid, "veiculoId" uuid, CONSTRAINT "PK_7324c33009c89ef016ee4d71ba0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "veiculos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placa" character varying(8) NOT NULL, "cor" character varying(50) NOT NULL, "modelo" character varying(50) NOT NULL, "marca" character varying(50) NOT NULL, "ano" integer NOT NULL, "chassi" character varying(17) NOT NULL, "cidadaoId" uuid, CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cidadaos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(120) NOT NULL, "idade" integer NOT NULL, "email" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "data_nascimento" date NOT NULL, "enderecoId" uuid, CONSTRAINT "UQ_68f3b7bbe4e72a108dcc97f22b8" UNIQUE ("email"), CONSTRAINT "UQ_b0e9037216d7369e60994f50689" UNIQUE ("cpf"), CONSTRAINT "PK_3ff2042dc6d2630da8c0def51df" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "boletins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying(500) NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), "data_atualizacao" date NOT NULL DEFAULT now(), "finalizado" boolean NOT NULL DEFAULT false, "policialId" uuid, "cidadaoId" uuid, "veiculoId" uuid, CONSTRAINT "PK_96278ceeac6527297efb1cde72e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "policiais" ADD CONSTRAINT "FK_1f2d80897e094e3f74ef4f09ba1" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "procurados" ADD CONSTRAINT "FK_b152805ddbd6e4ea18a23f41408" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "veiculos_multas" ADD CONSTRAINT "FK_d318ce8b23b94bde23384b135d4" FOREIGN KEY ("multaId") REFERENCES "multas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "veiculos_multas" ADD CONSTRAINT "FK_24abdecb2f4cf2f688674ec5cfd" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "veiculos" ADD CONSTRAINT "FK_08c99d53090f31df3d4e8318a23" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "cidadaos" ADD CONSTRAINT "FK_54d851f50f3f4230fd536af1bef" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "boletins" ADD CONSTRAINT "FK_eed2ede55b2346ab14ca881c86e" FOREIGN KEY ("policialId") REFERENCES "policiais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "boletins" ADD CONSTRAINT "FK_26ea6c50d57c15b4ed790241792" FOREIGN KEY ("cidadaoId") REFERENCES "cidadaos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "boletins" ADD CONSTRAINT "FK_39202bcf3a83d8f3e8fd280101a" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    await queryRunner.query(`
            INSERT INTO enderecos (id, logradouro, numero, bairro, complemento, cidade, estado, cep) VALUES
            ('fade7ad9-0624-4d34-b684-1b08cbfa9928', 'Av. Efigênio Sales', 177, 'Japiim', null, 'Manaus', 'AM', '69023250'),
            ('3bb6c4c2-f2e5-4692-a935-cd07258b0600', 'Rua 14 de Janeiro', 14, 'Pérola', 'Atrás do Banco do Brasil', 'São Paulo', 'SP', '69000991'),
            ('b5c86df0-2f95-49a3-ad74-d1c2174ae842', 'Rua Alemanha', 123, 'Bairro da Paz', 'Em frente à escola Tiradentes', 'Rio Branco', 'AC', '69000444'),
            ('47b03bb6-a97a-4080-8384-f19875dec385', 'Av. São Jorge', 1175 , 'Alvorada', null, 'Boa Vista', 'RR', '69000333'),
            ('fd73f66d-264c-4835-ac61-9a4c0680b774', 'Travessa Diamantina', 10, 'Centro', null, 'Cuiabá', 'MT', '69000222'),
            ('1cf83a76-9c4a-42cb-ab3d-1e9dfef71524', 'Av. Des. João Machado', 100, 'Santo Antônio', 'Ao lado do supermercado Carrefour', 'Rio de Janeiro', 'RJ', '69000111'),
            ('5032a498-23df-4086-bbd7-9d0e5d05efed', 'Travessa da Cadeia', 157, 'Cidade dos ladrões', 'Roubei o Brasil', 'Curitiba', 'PR', '12345678'),
            ('ac04dcd9-64ff-4cde-8ead-2f9f9abe7439', 'Rua do Planalto', 22, 'Vila Itamarati', null, 'Belo Horizonte', 'MG', '69004111'),
            ('46eb66b7-bee5-40cf-a2a4-054511a592f7', 'Av. Tiro-porrada-bomba', 99, 'Bairro do C4', 'Próximo ao comércio Cabooom', 'Fortaleza', 'CE', '69000123')`);

    await queryRunner.query(`INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento, "enderecoId")
        VALUES
            ('40d747f9-e836-4c8a-b898-b5d7ab474d3b', 'Filipe', 23, 'filipe@gmail.com', '55078318070', '27/05/1999', 'fade7ad9-0624-4d34-b684-1b08cbfa9928'),
            ('780c4fa5-39e9-48e9-9a90-2184ffbe0255', 'Vitor', 29, 'vitor@gmail.com', '24645335057', '27/05/1999', '3bb6c4c2-f2e5-4692-a935-cd07258b0600'),
            ('9abcdcbb-2917-430a-94dd-2e1923bfe20d', 'João', 23, 'joao@gmail.com', '81023429004', '27/05/1999', 'b5c86df0-2f95-49a3-ad74-d1c2174ae842'),
            ('9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', 'Matheus', 25, 'matheus.albuquerque@gmail.com', '79173077003', '27/05/1999', '47b03bb6-a97a-4080-8384-f19875dec385'),
            ('4f54f298-f52d-446f-af69-29adb59532ba', 'Calebe', 24, 'calebe_araujo@gmail.com', '71029487006', '27/05/1999', 'fd73f66d-264c-4835-ac61-9a4c0680b774'),
            ('f8fbbdf6-1b7a-4cce-9e15-d6d4ba99bd66', 'Antonio', 23, 'antonio123@gmail.com', '89842467007', '27/05/1999', '1cf83a76-9c4a-42cb-ab3d-1e9dfef71524'),
            ('7da45da8-1b7a-4cce-9e15-d6d4ba99bd66', 'Marcos', 23, 'marcos@gmail.com', '76860584092', '15/04/2003', '1cf83a76-9c4a-42cb-ab3d-1e9dfef71524')`);
    await queryRunner.query(`
        INSERT INTO veiculos (id, placa, cor, modelo, marca, chassi, "cidadaoId", ano) VALUES
            ('93063b57-6611-4792-ac6a-151a2fc6d3bf', 'ABC-0001', 'branco', '2500 LARAMIE SLT 6.7 TDI  CD 4x4 Diesel', 'RAM', '9BWSU19F08B302158', '780c4fa5-39e9-48e9-9a90-2184ffbe0255', 2022),
            ('981a4191-45d3-4afe-99f5-023970e1426c', 'BRA0S18', 'vermelho', 'Sentra SR 2.0 Flex Fuel 16V Mec.', 'Nissan', '7mK6TCV77B6PA7957', '9abcdcbb-2917-430a-94dd-2e1923bfe20d', 2022),
            ('c559c83d-ee9f-4a8d-9c03-f72f8ec705ef', 'HBR8F98', 'marrom', 'Impreza GL 4x4 1.8 16V', 'Subaru', '6F7yfhx3u1RfU5988', '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', 1993),
            ('322bb589-e17e-4302-9388-eb972ea66907', 'PHQ-1245', 'cinza', '575M Maranello F1 V12 515cv', 'Ferrari', '499nRBbvyeexe3648', 'f8fbbdf6-1b7a-4cce-9e15-d6d4ba99bd66', 2017),
            ('454bde2c-55e6-4230-bb4b-3b9f0ba278d5', 'GSS-9780', 'preto', 'Trans-AM 5.7 V8', 'Pontiac', '39r87UjwDDbU04024', '7da45da8-1b7a-4cce-9e15-d6d4ba99bd66', 2005),
        `);
    await queryRunner.query(`
        INSERT INTO policiais (id, patente, senha, administrador, ativo, data_criacao, data_atualizacao, "cidadaoId", cod_registro) VALUES
            ('d54d0f18-a75e-4033-af45-e4b227afce9e', 'Coronel', '$2a$10$gDRF06cY6P3a9wof8GAMSOWcRUOo/VWJi57VzeD6hAgSq3QTcb9T2', TRUE, TRUE, '20/10/2005', '20/10/2005', '9abcdcbb-2917-430a-94dd-2e1923bfe20d', '976648335'),
            ('e2e6cfce-1c09-4da1-a42b-e18405ccffa9', 'Cabo', '$2a$10$gDRF06cY6P3a9wof8GAMSOWcRUOo/VWJi57VzeD6hAgSq3QTcb9T2', FALSE, TRUE, '20/10/2005', '20/10/2005', '9c9d4c25-0e14-41c1-8ef2-d8d168d339f7', '715711505'),
            ('f8f49018-c733-4a16-8ccb-39ab7768432c', 'Comandante Geral', '$2a$10$gDRF06cY6P3a9wof8GAMSOWcRUOo/VWJi57VzeD6hAgSq3QTcb9T2', TRUE, TRUE, '20/10/2005', '20/10/2005', '4f54f298-f52d-446f-af69-29adb59532ba', '312770270')
        `);

    await queryRunner.query(`
      INSERT INTO multas (descricao, valor) VALUES
        ('Mal uso de uma buzina', 30),
        ('Cruzando ilegalmente uma linha contínua', 40),
        ('Dirigindo no lado errado da estrada', 250),
        ('Retorno ilegal', 250),
        ('Condução ilegal fora de estrada', 170),
        ('Recusando um comando legal', 30),
        ('Parar um veículo ilegalmente', 150),
        ('Estacionamento em local proibido', 70),
        ('Não dar preferência à direita', 70),
        ('Não cumprimento das informações do veículo', 90),
        ('Não parar em uma sinalização de parada', 105),
        ('Não parar em um sinal vermelho', 130),
        ('Ultrapassagem ilegal', 100),
        ('Dirigir um veículo com documentação irregular', 100),
        ('Dirigir sem habilitação', 1500),
        ('Causou um acidente e fugiu', 800),
        ('Excedeu a velocidade máxima em até 20%', 90),
        ('Excedeu a velocidade máxima em mais de 20% até 50%', 120),
        ('Excedeu a velocidade máxima acima de 50%', 300),
        ('Impedindo o fluxo de tráfego', 110),
        ('Intoxicação pública', 90),
        ('Condução desordenada', 90),
        ('Obstrução da justiça', 130),
        ('Insultos aos civis', 75),
        ('Desacato a autoridade', 110),
        ('Ameaça verbal contra um civil', 90),
        ('Ameaça verbal contra uma autoridade', 150),
        ('Fornecer informações falsas', 250),
        ('Tentativa de corrupção', 1500),
        ('Sem licença de porte para arma de fogo', 600),
        ('Ter posse de uma arma ilegal', 700),
        ('Ter posse de algo roubado', 300),
        ('Roubo de carro', 1800),
        ('Intenção de vender/distribuir uma substância ilegal', 1500),
        ('Fabricação de uma substância ilegal', 1500),
        ('Estar em posse de uma substância ilegal', 650),
        ('Sequestro de um Civil', 1500),
        ('Sequestro de uma autoridade', 2000),
        ('Roubo', 650),
        ('Assaltar uma loja estando armado', 650),
        ('Assaltar um banco estando armado', 1500),
        ('Assaltar um cidadão', 2000),
        ('Assaltar uma autoridade', 2500),
        ('Tentativa de assassinato de um civil', 3000),
        ('Tentativa de assassinato de uma autoridade', 5000),
        ('Assassinar um cidadão', 10000),
        ('Assassinar uma autoridade', 30000),
        ('Homicídio involuntário', 1800),
        ('Fraude', 2000)
      `);
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
