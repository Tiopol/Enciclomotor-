import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [motors, setMotors] = useState([])
  const [search, setSearch] = useState('')
  const [selectedMotor, setSelectedMotor] = useState(null)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentQr, setPaymentQr] = useState(null)

  useEffect(() => {
    if (search.length > 2) {
      axios.get(`/api/motors?search=${encodeURIComponent(search)}`)
        .then(res => setMotors(res.data))
    }
  }, [search])

  function login() {
    if (!email) return alert('Digite seu e-mail')
    setLoading(true)
    axios.post('/api/auth/login', { email }).then(res => {
      setUser(res.data)
      setLoading(false)
    }).catch(() => {
      alert('Erro no login')
      setLoading(false)
    })
  }

  function logout() {
    setUser(null)
    setSelectedMotor(null)
    setPaymentQr(null)
  }

  function buyMotor(motorId) {
    setLoading(true)
    axios.post('/api/payment/pix', { userId: user.id, motorId })
      .then(res => {
        setPaymentQr(res.data.qr_code)
        setLoading(false)
      })
      .catch(() => {
        alert('Erro na geração do pagamento')
        setLoading(false)
      })
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enciclomotor - Login</h2>
        <input type="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={login} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Enciclomotor</h1>
      <button onClick={logout}>Sair</button>
      <hr />
      <input
        type="text"
        placeholder="Buscar motor (ex: AP 1.8)"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {motors.map(m => (
          <li key={m.id} onClick={() => setSelectedMotor(m)} style={{ cursor: 'pointer', margin: '8px 0' }}>
            {m.make} - {m.model} - {m.engineCode}
          </li>
        ))}
      </ul>

      {selectedMotor && (
        <div style={{ marginTop: 20 }}>
          <h3>{selectedMotor.make} {selectedMotor.model} ({selectedMotor.year})</h3>
          <p>Código: {selectedMotor.engineCode}</p>
          <p>Descrição: {selectedMotor.description}</p>
          <p>Diâmetro cilindro: {selectedMotor.cylinder_diameter_std} mm</p>
          <p>Folga pistão: {selectedMotor.piston_clearance_std} mm</p>
          {/* Mostrar mais dados conforme precisar */}

          {!selectedMotor.paid ? (
            <button onClick={() => buyMotor(selectedMotor.id)} disabled={loading}>
              {loading ? 'Gerando pagamento...' : 'Comprar acesso R$8,99'}
            </button>
          ) : (
            <p>Acesso liberado!</p>
          )}

          {paymentQr && (
            <div>
              <h4>Escaneie o QR Code para pagar PIX:</h4>
              <img src={`data:image/png;base64,${paymentQr}`} alt="QR Code PIX" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
