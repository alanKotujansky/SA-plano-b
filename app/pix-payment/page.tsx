"use client"

import { useState, useEffect } from "react"

export default function PixPayment() {
  const [countdown, setCountdown] = useState("20:00")
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const id = "#" + Math.floor(Math.random() * 90000000 + 10000000)
    setOrderId(id)

    let secondsLeft = 20 * 60
    const timer = setInterval(() => {
      const m = Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0")
      const s = (secondsLeft % 60).toString().padStart(2, "0")
      setCountdown(`${m}:${s}`)
      if (secondsLeft <= 0) clearInterval(timer)
      secondsLeft--
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const copyPixCode = () => {
    navigator.clipboard.writeText("PIX-CODE-SAMPLE")
    alert("Código PIX copiado!")
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            Sensor<span>Link</span>
          </div>
          <nav className="main-nav">
            <a className="nav-link" href="/">
              Início
            </a>
            <a className="nav-link" href="/produtos">
              Produtos
            </a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout">
                🛒 Carrinho
              </a>
              <span className="cart-badge" id="cartBadge">
                0
              </span>
            </div>
            <a className="nav-link" href="/login">
              Entrar
            </a>
          </nav>
        </div>
      </header>

      <main className="pix-main">
        <div className="container">
          <div className="pix-header">
            <h1 className="pix-title">Pagamento via PIX</h1>
            <div className="pix-status">
              <span className="status-badge">Aguardando pagamento</span>
              <span className="pix-order">Pedido: {orderId}</span>
            </div>
          </div>

          <div className="pix-content">
            <div className="pix-left">
              <div className="qr-section">
                <div className="qr-header">
                  <div className="pix-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M12 8H8v4h4V8zM24 8h-4v4h4V8zM12 20H8v4h4v-4z" fill="currentColor" />
                      <path d="M20 20h4v4h-4v-4zM16 8h-2v4h2V8zM8 16h4v2H8v-2z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="qr-title">Escaneie o QR Code</h2>
                    <p className="qr-subtitle">Use o app do seu banco para pagar</p>
                  </div>
                </div>

                <div className="qr-code-box">
                  <img
                    className="qr-image"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=PIX-CODE-SAMPLE`}
                    alt="QR Code Pix"
                  />
                </div>

                <div className="timer-box">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor" />
                    <path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>
                    Expira em <strong>{countdown}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="pix-right">
              <div className="payment-card">
                <div className="payment-header">
                  <h3 className="payment-title">Detalhes do Pagamento</h3>
                  <span className="payment-amount">R$ 240,00</span>
                </div>
                <div className="payment-method">
                  <div className="method-icon">PX</div>
                  <div>
                    <div className="method-name">Pix</div>
                    <div className="method-desc">Pagamento instantâneo</div>
                  </div>
                </div>
              </div>

              <div className="code-card">
                <h3 className="code-title">Ou pague com Pix Copia e Cola</h3>
                <p className="code-desc">Copie o código abaixo e cole no seu aplicativo de pagamento</p>

                <div className="code-box">
                  <code className="pix-code-text">PIX-CODE-SAMPLE</code>
                </div>

                <button onClick={copyPixCode} className="copy-button">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7 3a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2H7z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M5 7V5a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Copiar código PIX
                </button>
              </div>

              <div className="help-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                    fill="currentColor"
                  />
                </svg>
                <div>
                  <h4 className="help-title">Problemas com o pagamento?</h4>
                  <p className="help-desc">Clique abaixo para usar o processo manual</p>
                  <a href="#" className="help-link">
                    Acessar processo manual →
                  </a>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={() => (window.location.href = "/checkout")} className="btn-back">
                  ← Voltar
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("sl_cart")
                    alert(`Obrigado! Pagamento registrado. Seu pedido ${orderId} está em processamento.`)
                    window.location.href = "/"
                  }}
                  className="btn-confirm"
                >
                  Já paguei
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          © 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
    </>
  )
}
