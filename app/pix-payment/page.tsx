'use client'

import { useState, useEffect } from 'react'

export default function PixPayment() {
  const [countdown, setCountdown] = useState('20:00')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const id = '#' + Math.floor(Math.random() * 90000000 + 10000000)
    setOrderId(id)

    let secondsLeft = 20 * 60
    const timer = setInterval(() => {
      const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
      const s = (secondsLeft % 60).toString().padStart(2, '0')
      setCountdown(`${m}:${s}`)
      if (secondsLeft <= 0) clearInterval(timer)
      secondsLeft--
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">Sensor<span>Link</span></div>
          <nav className="main-nav">
            <a className="nav-link" href="/">Início</a>
            <a className="nav-link" href="/produtos">Produtos</a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout">🛒 Carrinho</a>
              <span className="cart-badge" id="cartBadge">0</span>
            </div>
            <a className="nav-link" href="/login">Entrar</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container pix-page">
          <div className="pix-info">
            <h1 id="pixTitle">Pagamento {orderId} pendente</h1>
          </div>

          <div className="pix-grid">
            <div className="qr-box">
              <img className="qr-img" src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=PIX-CODE-SAMPLE`} alt="QR Code Pix" />
            </div>

            <div>
              <div className="pix-card">
                <strong>Pedido: <a href="#">{orderId}</a></strong>
                <div className="countdown">O pagamento irá expirar em <span id="countdown">{countdown}</span>.</div>
              </div>

              <div className="pix-card">
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '48px', height: '48px', borderRadius: '8px', background: 'var(--blue-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700'}}>PX</div>
                  <div>
                    <div style={{fontWeight: '700'}}>Pix</div>
                    <div style={{color: '#666'}}>Pagamento por Pix</div>
                  </div>
                  <div style={{marginLeft: 'auto', color: '#333', fontWeight: '700'}}>R$ 0,00</div>
                </div>
              </div>

              <div className="pix-card">
                <div>Use o <strong>QRcode</strong> ou o <strong>código copia e cola</strong> abaixo para pagar utilizando o Pix.</div>
                <pre id="pixCode" className="pix-code" style={{marginTop: '12px'}}>PIX-CODE-SAMPLE</pre>
                <div style={{marginTop: '8px'}}><button id="copyCode" className="copy-btn">Copiar código</button></div>
              </div>

              <div className="pix-card" style={{background: '#fff8f2', borderColor: '#ffd9b3', color: '#b05b00'}}>
                <strong>Você está com problemas no pagamento via PIX?</strong>
                <div style={{marginTop: '8px'}}>Clique abaixo para utilizar o processo manual.</div>
                <div style={{marginTop: '8px'}}><a href="#">Clique aqui</a></div>
              </div>

              <div className="pix-actions">
                <button id="btnBack" className="pix-back" onClick={() => window.location.href = '/checkout'}>Voltar</button>
                <button id="btnPaid" className="pix-ok" onClick={() => { localStorage.removeItem('sl_cart'); alert(`Obrigado! Pagamento registrado. Seu pedido ${orderId} está em processamento.`); window.location.href = '/'; }}>Já paguei</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">© 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
    </>
  )
}
