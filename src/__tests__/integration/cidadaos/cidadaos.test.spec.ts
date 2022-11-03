import { AppDataSource } from '../../../data-source'
import { DataSource } from 'typeorm'
import request from 'supertest'
import app from '../../../app'

describe('Testes para a rota /cidadaos', () => {
 let connection: DataSource

 beforeAll(async () => {
  await AppDataSource.initialize()
   .then(async (dataSource) => {
    connection = dataSource
    await dataSource.query(
     `INSERT INTO enderecos (id, logradouro, numero, bairro, complemento, cidade, estado, cep)
      VALUES
        ('fade7ad9-0624-4d34-b684-1b08cbfa9928', 'Av. Efigênio Sales', 177, 'Japiim', null, 'Manaus', 'AM', '69023250'),
        ('3bb6c4c2-f2e5-4692-a935-cd07258b0600', 'Rua 14 de Janeiro', 14, 'Pérola', 'Atrás do Banco do Brasil', 'São Paulo', 'SP', '69000991');`
    )
    await dataSource.query(
     `INSERT INTO cidadaos (id, nome, idade, email, cpf, data_nascimento, "enderecoId")
      VALUES 
        ('40d747f9-e836-4c8a-b898-b5d7ab474d3b', 'Filipe', 23, 'filipe@gmail.com', '70238506274', '27/05/1999', 'fade7ad9-0624-4d34-b684-1b08cbfa9928'),
        ('780c4fa5-39e9-48e9-9a90-2184ffbe0255', 'Vitor', 29, 'vitor@gmail.com', '12345678910', '27/05/1999', '3bb6c4c2-f2e5-4692-a935-cd07258b0600');`
    )
   })
   .catch((error) => console.log(error))
 })

 afterAll(async () => {
  await connection.destroy()
 })

 test('GET /cidadaos - É possível listar todos os cidadãos', async () => {
  const response = await request(app).get('/cidadaos')

  expect(response.status).toBe(200)
 })

 test('GET /cidadaos/:cpf - É possível encontrar o cidadão pelo cpf', async () => {
  const citizenFound = await request(app).get('/cidadaos')
  const cpf = citizenFound.body[0].cpf
  const response = await request(app).get(`/cidadaos/${cpf}`)

  expect(response.status).toBe(200)
  expect(response.body).toHaveProperty("id")
  expect(response.body).toHaveProperty("nome")
  expect(response.body).toHaveProperty("idade")
  expect(response.body).toHaveProperty("email")
  expect(response.body).toHaveProperty("cpf")
  expect(response.body).toHaveProperty("data_nascimento")
  expect(response.body).toHaveProperty("endereco")
 })

 test("GET /cidadaos/:cpf - Não deve ser possível encontrar um cidadão não cadastrado", async () => {
  const citizenFound = await request(app).get('/cidadaos')
  const cpf = citizenFound.body[0].cpf
  const response = await request(app).get(`/cidadaos/${cpf}`)

  expect(response.status).toBe(404)
  expect(response.body).not.toBe(citizenFound.body[0])
  expect(response.body).toHaveProperty("message")
 })
})
