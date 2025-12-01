"use client"

import { useState } from "react"

export default function Produtos() {
  const [showDetails, setShowDetails] = useState(false)

  const products = [
    {
      name: "SensorLink",
      desc: "FAZ TUDO PRA VC LIGA LUZ E DESLIGA SELOCO",
      price1: "R$240,00 à vista",
      price2: "R$42,90 em até 6x",
    },
  ]

  const addToCart = (productName: string) => {
    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    cart.push({ name: productName, date: new Date().toISOString() })
    localStorage.setItem("sl_cart", JSON.stringify(cart))
    const badge = document.getElementById("cartBadge")
    if (badge) badge.textContent = cart.length.toString()
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            Sensor<span>Link</span>
          </div>
          <nav className="main-nav">
            <a className="nav-link" href="/" title="Início">
              🏠 Início
            </a>
            <a className="nav-link" href="/produtos" title="Produtos">
              🛒 Produtos
            </a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout" title="Carrinho">
                🛒 Carrinho
              </a>
              <span className="cart-badge" id="cartBadge">
                0
              </span>
            </div>
            <a className="nav-link" href="/login" title="Entrar">
              👤 Entrar
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container products-page">
          <div className="products-grid products-grid-single">
            {products.map((product, idx) => (
              <div key={idx} className="product-item">
                <h3>{product.name}</h3>
                <div className="product-image">
                  <img
                    src="/arduino.png"
                    alt="Arduino SensorLink"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <p className="product-desc">{product.desc}</p>
                <div className="product-prices">
                  <div className="price-line">{product.price1}</div>
                  <div className="price-line">{product.price2}</div>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button onClick={() => setShowDetails(true)} className="btn-detalhes">
                    Detalhes
                  </button>
                  <button onClick={() => addToCart(product.name)} className="btn-comprar">
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDetails(false)}>
              ×
            </button>
            <h2 style={{ color: "#00bcd4", marginBottom: "20px" }}>SensorLink - Detalhes do Produto</h2>

            <div className="modal-body">
              <h3>Sobre o Produto</h3>
              <p>
                O <strong>SensorLink</strong> é um sistema inteligente de automação residencial baseado em Arduino,
                desenvolvido para facilitar o controle de dispositivos elétricos da sua casa de forma prática e
                eficiente.
              </p>

              <h3>Características Principais</h3>
              <ul>
                <li>
                  <strong>Controle Remoto:</strong> Ligue e desligue lâmpadas, ventiladores e outros aparelhos pelo
                  celular
                </li>
                <li>
                  <strong>Monitoramento em Tempo Real:</strong> Acompanhe o consumo de energia dos dispositivos
                  conectados
                </li>
                <li>
                  <strong>Automação Inteligente:</strong> Programe horários para ligar/desligar automaticamente
                </li>
                <li>
                  <strong>Fácil Instalação:</strong> Não precisa mexer na fiação elétrica existente
                </li>
                <li>
                  <strong>Economia de Energia:</strong> Reduza até 30% no consumo elétrico mensal
                </li>
              </ul>

              <h3>Especificações Técnicas</h3>
              <ul>
                <li>Microcontrolador: Arduino UNO R3</li>
                <li>Conectividade: WiFi integrado (ESP8266)</li>
                <li>Tensão de Operação: 127V / 220V (bivolt)</li>
                <li>Capacidade: Controla até 4 dispositivos simultaneamente</li>
                <li>Aplicativo: Compatível com Android e iOS</li>
                <li>Garantia: 12 meses</li>
              </ul>

              <h3>Conteúdo da Embalagem</h3>
              <ul>
                <li>1x Placa SensorLink (Arduino + módulo WiFi)</li>
                <li>1x Fonte de alimentação 5V</li>
                <li>4x Módulos relé para controle de dispositivos</li>
                <li>1x Manual de instalação em português</li>
                <li>Cabos de conexão</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="container footer-inner">
          © 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
      <script src="/main.js"></script>
      <script src="/chat.js"></script>
    </>
  )
}
