const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Dados simulados (motors e usuários)
let motors = require('./db/motors.json')
let users = []
let orders = []

// Autenticação simples
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })
  let user = users.find(u => u.email === email)
  if (!user) {
    user = { id: uuidv4(), email }
    users.push(user)
  }
  res.json(user)
})

// Buscar motores
app.get('/api/motors', (req, res) => {
  const search = (req.query.search || '').toLowerCase()
  const filtered = motors.filter(m =>
    m.make.toLowerCase().includes(search) ||
    m.model.toLowerCase().includes(search) ||
    m.engineCode.toLowerCase().includes(search)
  )
  res.json(filtered)
})

// Criar pedido e gerar PIX (mock)
app.post('/api/payment/pix', (req, res) => {
  const { userId, motorId } = req.body
  if (!userId || !motorId) return res.status(400).json({ error: 'userId and motorId required' })

  const orderId = uuidv4()
  const order = { orderId, userId, motorId, amount: 8.99, status: 'pending', createdAt: new Date() }
  orders.push(order)

  // Simular retorno de QR code PIX em base64 (você deve substituir aqui pela integração real Gerencianet)
  const dummyQrBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAIAAAD0TcW3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB...'
  res.json({ orderId, qr_code: dummyQrBase64 })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`)
})
