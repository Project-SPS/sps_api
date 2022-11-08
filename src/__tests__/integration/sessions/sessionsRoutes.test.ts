import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import request from 'supertest'
import app from '../../../app'
import { mockedSessions, mockedSessionsWrongCodeRegister, mockedSessionsWrongPassword } from '../../mock'
import { hash } from 'bcryptjs'

describe('Testes para as rotas /sessions', () => {
 let connection: DataSource

 beforeAll(async () => {
  await AppDataSource.initialize().then(async (dataSource) => {
   connection = dataSource
   
   const senhaHash1 = await hash(mockedSessions.senha, 10)
   const senhaErradaHash = await hash(mockedSessionsWrongPassword.senha, 10)

   await dataSource.query(
    `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento)
     VALUES 
       ('40d747f9-e836-4c8a-b898-b5d7ab474d3b', 'Filipe', 23, 'filipe@gmail.com', '70238506274', '27/05/1999'),
       ('780c4fa5-39e9-48e9-9a90-2184ffbe0255', 'Vitor', 29, 'vitor@gmail.com', '12345678910', '27/05/1999');`
   )
   await dataSource.query(
    `INSERT INTO policiais (id, patente, senha, administrador, ativo, data_criacao, data_atualizacao, "cidadaoId", cod_registro)
     VALUES 
      ('d54d0f18-a75e-4033-af45-e4b227afce9e', 'Coronel', '${senhaHash1}', TRUE, TRUE, '20/10/2005', '20/10/2005', '40d747f9-e836-4c8a-b898-b5d7ab474d3b', '000000001'),
      ('e2e6cfce-1c09-4da1-a42b-e18405ccffa9', 'Cabo', '${senhaErradaHash}', FALSE, TRUE, '20/10/2005', '20/10/2005', '780c4fa5-39e9-48e9-9a90-2184ffbe0255', '000000002');
    `
   )
  })
  .catch((error) => console.log(error))
 })

 afterAll(async () => await connection.destroy())

 test("POST /sessions - É possível fazer login", async () => {
  const response = await request(app).post("/sessions").send(mockedSessions)
  
  expect(response.body).toHaveProperty("token")
  expect(response.status).toBe(200)
 })

 test("POST /sessions - Não é possível fazer login com senha errada", async () => {
  const response = await request(app).post("/sessions").send(mockedSessionsWrongPassword)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(400)
 })
 
 test("POST /sessions - Não é possível fazer login com código de registro errado", async () => {
  const response = await request(app).post("/sessions").send(mockedSessionsWrongCodeRegister)

  expect(response.body).toHaveProperty("message")
  expect(response.status).toBe(400)
 })

})